import polyline from "@mapbox/polyline";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

// Nombre de la tarea en background
const LOCATION_TASK_NAME = "background-location-task";

// Tipo para coordenadas
interface Coordinate {
  latitude: number;
  longitude: number;
}

// Define la tarea de ubicación en background
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Error en background location:", error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];

    console.log("📍 Ubicación en background:", {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      timestamp: new Date(location.timestamp).toLocaleTimeString(),
    });

    // Aquí puedes enviar la ubicación a tu servidor
    sendLocationToServer({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
    });
  }
});

// Función para enviar ubicación al servidor
async function sendLocationToServer(location: {
  latitude: number;
  longitude: number;
  timestamp: number;
}) {
  try {
    // Reemplaza con tu endpoint
    const response = await fetch("https://tu-servidor.com/api/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });

    if (response.ok) {
      console.log("✅ Ubicación enviada al servidor");
    }
  } catch (error) {
    console.error("❌ Error al enviar ubicación:", error);
  }
}

export default function MapViewComponent() {
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  const initialRegion = {
    latitude: 10.9878,
    longitude: -74.7889,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  // Solicitar permisos de ubicación (incluyendo background)
  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();

    if (foregroundStatus !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita permiso de ubicación");
      return false;
    }

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();

    if (backgroundStatus !== "granted") {
      Alert.alert(
        "Permiso de fondo denegado",
        "Para rastrear en segundo plano, habilita 'Permitir siempre' en la configuración"
      );
      return false;
    }

    return true;
  };

  // Iniciar tracking en background
  const startBackgroundTracking = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
      if (!isTaskDefined) {
        console.error("La tarea no está definida");
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 1, // Actualizar cada 10 segundos
        distanceInterval: 10, // O cada 10 metros
        foregroundService: {
          notificationTitle: "Rastreando ubicación",
          notificationBody: "Tu ubicación se está compartiendo",
          notificationColor: "#4285F4",
        },
        pausesUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: true,
      });

      setIsTracking(true);
      console.log("✅ Background tracking iniciado");
    } catch (error) {
      console.error("Error al iniciar tracking:", error);
    }
  };

  // Detener tracking en background
  const stopBackgroundTracking = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      setIsTracking(false);
      console.log("🛑 Background tracking detenido");
    } catch (error) {
      console.error("Error al detener tracking:", error);
    }
  };

  // Ubicación en tiempo real (foreground)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          setDeviceLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          console.log("Ubicación actualizada:", location.coords);
        }
      );
    })();

    return () => {
      locationSubscription.current?.remove();
    };
  }, []);

  // Waypoints para la ruta
  const waypoints: Coordinate[] = [
    { latitude: 11.017456, longitude: -74.851353 },
    { latitude: 10.944124, longitude: -74.833767 },
    { latitude: 10.908506, longitude: -74.793681 },
  ];

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Función para obtener la ruta
  const fetchRoute = async () => {
    try {
      const waypointsStr = waypoints
        .slice(1, -1)
        .map((wp) => `${wp.latitude},${wp.longitude}`)
        .join("|");

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        waypoints[0].latitude
      },${waypoints[0].longitude}&destination=${
        waypoints[waypoints.length - 1].latitude
      },${
        waypoints[waypoints.length - 1].longitude
      }&waypoints=${waypointsStr}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      if (!json.routes || json.routes.length === 0) {
        console.warn("No se encontró ruta");
        setRouteCoords([]);
        return;
      }

      const points: number[][] = polyline.decode(
        json.routes[0].overview_polyline.points
      );

      const coordinates: Coordinate[] = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));

      setRouteCoords(coordinates);
      console.log("Coordenadas de la ruta:", coordinates.length, "puntos");
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  };

  useEffect(() => {
    if (GOOGLE_API_KEY) {
      fetchRoute();
    } else {
      console.warn("No se configuró GOOGLE_API_KEY");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={waypoints[0]}
            title="Inicio"
            description="Punto de partida"
            pinColor="green"
          />

          <Marker
            coordinate={waypoints[waypoints.length - 1]}
            title="Destino"
            description="Punto de llegada"
            pinColor="red"
          />

          {deviceLocation && (
            <Marker
              coordinate={deviceLocation}
              title="Mi Ubicación"
              description="Tu ubicación actual"
            >
              <View style={styles.busMarker}>
                <Text style={styles.busEmoji}>🚌</Text>
              </View>
            </Marker>
          )}

          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#4285F4"
              strokeWidth={5}
            />
          )}
        </MapView>
      </View>
      <View style={styles.controls}>
        <Pressable
          onPress={
            isTracking ? stopBackgroundTracking : startBackgroundTracking
          }
          style={{
            backgroundColor: isTracking ? "#FF3B30" : "#4285F4",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 10,
            width: "200",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {isTracking ? "Detener Tracking" : "Iniciar Tracking"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "70%",
    overflow: "hidden",
    marginBottom: 20,
  },
  containerMap: {
    height: "80%",
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  controls: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  statusText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#34C759",
  },
  map: {
    width: "100%",
    flex: 1,
  },
  busMarker: {
    backgroundColor: "transparent",
  },
  busEmoji: {
    fontSize: 24,
  },
});
