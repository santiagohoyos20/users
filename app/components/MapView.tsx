import polyline from "@mapbox/polyline";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { k54Route_ida } from "./k54_ida";
import { k54Route_vuelta } from "./k54_vuelta";
// Tipo para coordenadas
interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function MapViewComponent() {
  const [busesLocation, setBusesLocation] = useState<Coordinate[]>([]);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(true);

  const busId = "bus000";
  const API_URL = `https://unchallengeably-overglad-brinda.ngrok-free.dev/telemetry/current/${busId}`;

  //  const inputBuses = [
  //   { latitude: 11.017456, longitude: -74.851353 },
  //   { latitude: 11.00184, longitude: -74.841763 },
  //   { latitude: 10.944124, longitude: -74.833767 },
  //   { latitude: 10.908506, longitude: -74.793681 }, // Carrera 46
  // ];

  

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();

        // Espera que el backend retorne algo como:
        // [
        //   { lat: 10.98, lng: -74.78, vehicleId: "bus321" },
        //   { lat: 10.99, lng: -74.80, vehicleId: "bus122" }
        // ]

        // Lo mapeas a tu formato interno
        const safeArray = Array.isArray(data) ? data : [data];

        const mapped = safeArray.map((item: any) => ({
          latitude: item.lat,
          longitude: item.lng,
        }));

        setBusesLocation(mapped);
        setLoading(false);
      } catch (error) {
        console.log("Error obteniendo buses:", error);
      }
    };

    // Llamada inicial
    fetchBuses();

    // Actualiza cada 5 segundos
    const interval = setInterval(fetchBuses, 5000);

    return () => clearInterval(interval);
  }, []);

  const initialRegion = {
    latitude: 10.9878,
    longitude: -74.7889,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  // Rutas de ejemplo
  const k54Route = [
    { latitude: 11.017456, longitude: -74.851353 },
    { latitude: 11.01654, longitude: -74.81438 }, // Ventana al Mundo
    { latitude: 10.9999, longitude: -74.8142 }, // Cerca a Uninorte
    { latitude: 10.9868, longitude: -74.7995 }, // Vía 40 entrando
    { latitude: 10.9759, longitude: -74.7862 }, // Centro BQ
    { latitude: 10.9621, longitude: -74.7865 }, // Entrada Circunvalar
    { latitude: 10.9441, longitude: -74.8027 }, // Puente de la Cordialidad
    { latitude: 10.9154, longitude: -74.7848 }, // Ingreso Soledad
    { latitude: 10.9006, longitude: -74.7735 }, // Av. Murillo
  ];

  // Waypoints para la ruta
  const waypoints: Coordinate[] = k54Route_ida;

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCzM0x-5dDFApvSjNrjXM6JStcylPGFIqU";

  // Función para obtener la ruta de google maps
  
//   const fetchRoute = async () => {
//   try {
//     const chunks = chunkArray(waypoints, 25);
//     let fullRoute: Coordinate[] = [];

//     for (let i = 0; i < chunks.length; i++) {
//       const chunk = chunks[i];

//       if (chunk.length < 2) continue;

//       const origin = chunk[0];
//       const destination = chunk[chunk.length - 1];

//       const waypointsStr = chunk
//         .slice(1, -1)
//         .map((wp) => `${wp.latitude},${wp.longitude}`)
//         .join("|");

//       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
//         origin.latitude
//       },${origin.longitude}&destination=${destination.latitude},${
//         destination.longitude
//       }&waypoints=${waypointsStr}&key=${GOOGLE_API_KEY}`;

//       console.log(`Request ${i + 1}/${chunks.length}`);

//       const res = await fetch(url);
//       const json = await res.json();

//       if (!json.routes || json.routes.length === 0) {
//         console.warn("No route in chunk", i);
//         continue;
//       }

//       const points = polyline.decode(json.routes[0].overview_polyline.points);

//       const chunkCoords = points.map(([lat, lng]) => ({
//         latitude: lat,
//         longitude: lng,
//       }));

//       // Agregarlos a la ruta final
//       fullRoute = [...fullRoute, ...chunkCoords];
//     }

//     setRouteCoords(fullRoute);
//     console.log("Ruta total generada:", fullRoute.length, "puntos");

//   } catch (error) {
//     console.error("Error al obtener la ruta:", error);
//   }
// };


  useEffect(() => {
    if (GOOGLE_API_KEY) {
      //fetchRoute();
      console.log("GOOGLE_API_KEY está configurada. y la vida es bella y amo a las tortugas y a Natalia");
    } else {
      console.warn("No se configuró GOOGLE_API_KEY e igual amo a las tortugas y a Natalia");
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

          {busesLocation
            .filter((location) => location !== null)
            .map((location, index) => (
              <Marker
                key={index}
                coordinate={location}
                title={`Bus ${index + 1}`}
                description="Ubicación del bus"
              >
                <View style={styles.busMarker}>
                  <Text style={styles.busEmoji}>🚌</Text>
                </View>
              </Marker>
            ))}

          <Polyline
            coordinates={k54Route_ida}
            strokeColor="#4285F4"
            strokeWidth={5}
          />
          <Polyline
            coordinates={k54Route_vuelta}
            strokeColor="#ff0000ff"
            strokeWidth={5}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    overflow: "hidden",
  },
  containerMap: {
    flex: 1,
    overflow: "hidden",
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
