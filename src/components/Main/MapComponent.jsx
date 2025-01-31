import { useEffect, useRef, useState } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { API_KEY } from "../../api/api";
import { useMap } from "../../state/MapRoutesStore";

const MapComponent = () => {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const { center, startPoint, endPoint, isRouteEnabled, setRouteDistance, setRouteDuration } = useMap();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const defaultZoom = 13;

  const mapState = {
    center: center,
    zoom: defaultZoom,
  };
  const moveToCoordinates = (coordinates) => {
    if (mapRef.current && coordinates) {
      mapRef.current.setCenter(coordinates, defaultZoom, {
        duration: 300,
      });
    }
  };

  const buildRoute = async (ymaps) => {
    if (!mapRef.current || !startPoint || !endPoint) return;
    if (startPoint && endPoint && mapRef.current) {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [startPoint, endPoint],
          params: { routingMode: "auto" },
        },
        { boundsAutoApply: true },
      );
      mapRef.current.geoObjects.removeAll();
      mapRef.current.geoObjects.add(multiRoute);
      multiRoute.model.events.add("requestsuccess", () => {
        const activeRoute = multiRoute.getActiveRoute();
        if (activeRoute) {
          const distance = activeRoute.properties.get("distance");
          const duration = activeRoute.properties.get("duration");
          setRouteDistance(distance.text);
          setRouteDuration(duration.text);
        }
      });
    }
  };

  useEffect(() => {
    console.log(isRouteEnabled, ymapsRef.current);
    if (isRouteEnabled && ymapsRef.current && startPoint && endPoint) {
      console.log("Building route...");
      buildRoute(ymapsRef.current);
    } else if (!isRouteEnabled && ymapsRef.current) {
      console.log("Clearing route...");
      mapRef.current?.geoObjects.removeAll();
      setRouteDistance(null);
      setRouteDuration(null);
    }
  }, [isRouteEnabled, startPoint, endPoint, isMapLoaded]);

  useEffect(() => {
    moveToCoordinates(center);
  }, [center]);

  return (
    <YMaps query={{ apikey: API_KEY, load: ["multiRouter.MultiRoute"] }}>
      <div style={{ width: "100%", height: "100%" }}>
        <Map
          defaultState={mapState}
          width='100%'
          height='100%'
          onLoad={(ymaps) => {
            ymapsRef.current = ymaps;
            setIsMapLoaded(true);
          }}
          instanceRef={(map) => {
            mapRef.current = map;
          }}
          options={{
            controls: [],
          }}></Map>
      </div>
    </YMaps>
  );
};

export default MapComponent;
