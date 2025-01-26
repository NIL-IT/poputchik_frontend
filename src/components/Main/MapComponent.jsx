import { useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { API_KEY } from "../../api/api";
import { useMap } from "../../state/MapRoutesStore";

const MapComponent = () => {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const { center, startPoint, endPoint, isRouteEnabled, setRouteDistance, setRouteDuration } = useMap();
  const defaultZoom = 13;

  const mapState = {
    center: center,
    zoom: defaultZoom,
  };

  const buildRoute = async (ymaps) => {
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
    if (isRouteEnabled && ymapsRef.current) {
      buildRoute(ymapsRef.current);
    } else if (!isRouteEnabled && ymapsRef.current) {
      mapRef.current.geoObjects.removeAll();
      setRouteDistance(null);
      setRouteDuration(null);
    }
  }, [isRouteEnabled, startPoint, endPoint]);
  return (
    <YMaps query={{ apikey: API_KEY, load: ["multiRouter.MultiRoute"] }}>
      <div style={{ width: "100%", height: "60%" }}>
        <Map
          defaultState={mapState}
          width='100%'
          height='100%'
          onLoad={(ymaps) => {
            ymapsRef.current = ymaps;
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
