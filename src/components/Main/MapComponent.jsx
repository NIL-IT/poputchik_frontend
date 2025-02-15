import { useEffect, useRef, useState } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { API_KEY } from "../../api/api";
import { useMap } from "../../state/MapRoutesStore";
import mapIcon from "../../assets/icons/map.svg";

const MapComponent = () => {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const userPlacemarkRef = useRef(null);
  const { center, startPoint, endPoint, isRouteEnabled, setRouteDistance, setRouteDuration } = useMap();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const defaultZoom = 13;

  const mapState = {
    center: center,
    zoom: defaultZoom,
  };

  const buildRoute = async (ymaps) => {
    if (!mapRef.current || !startPoint || !endPoint) return;

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
      if (activeRoute && activeRoute.properties && typeof activeRoute.properties.get === "function") {
        const distance = activeRoute.properties.get("distance");
        const duration = activeRoute.properties.get("duration");
        setRouteDistance(distance.text);
        setRouteDuration(duration.text);
      } else {
        console.warn("Не удалось получить данные активного маршрута");
      }
    });
  };

  useEffect(() => {
    if (isRouteEnabled && ymapsRef.current && startPoint && endPoint) {
      buildRoute(ymapsRef.current);
    } else if (!isRouteEnabled && ymapsRef.current) {
      mapRef.current?.geoObjects.removeAll();
      setRouteDistance(null);
      setRouteDuration(null);
    }
  }, [isRouteEnabled, startPoint, endPoint, isMapLoaded]);

  useEffect(() => {
    if (isMapLoaded && ymapsRef.current && mapRef.current && center) {
      if (userPlacemarkRef.current) {
        userPlacemarkRef.current.geometry.setCoordinates(center);
      } else {
        userPlacemarkRef.current = new ymapsRef.current.Placemark(
          center,
          { balloonContent: "Вы здесь" },
          {
            iconLayout: "default#image",
            iconImageHref: mapIcon,
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15],
          },
        );
        mapRef.current.geoObjects.add(userPlacemarkRef.current);
      }
    }
  }, [center, isMapLoaded]);

  return (
    <YMaps query={{ apikey: API_KEY, load: ["multiRouter.MultiRoute", "Placemark"] }}>
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
