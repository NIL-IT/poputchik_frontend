import { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "../state/MapRoutesStore";

export const useLocation = () => {
  const { setPosition } = useMap();
  const [isLocationInitialized, setIsLocationInitialized] = useState(false);
  const [locationDenied, setLocationDenied] = useState(localStorage.getItem("locationPermission") === "denied");
  const initializationInProgress = useRef(false);
  const locationUpdateInterval = useRef(null);

  const initialLocationRequest = useCallback(async () => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || locationDenied || initializationInProgress.current) {
      return false;
    }

    try {
      initializationInProgress.current = true;

      if (localStorage.getItem("locationPermission") === "granted") {
        setIsLocationInitialized(true);
        return true;
      }

      const result = await new Promise((resolve) => {
        tg.LocationManager.init((error) => {
          if (error) {
            localStorage.setItem("locationPermission", "denied");
            setLocationDenied(true);
            resolve(false);
          } else {
            localStorage.setItem("locationPermission", "granted");
            setIsLocationInitialized(true);
            resolve(true);
          }
        });
      });

      return result;
    } catch (error) {
      console.error("Ошибка инициализации LocationManager:", error);
      localStorage.setItem("locationPermission", "denied");
      setLocationDenied(true);
      return false;
    } finally {
      initializationInProgress.current = false;
    }
  }, [locationDenied]);

  const updateLocation = useCallback(() => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || locationDenied || !isLocationInitialized) return;

    tg.LocationManager.getLocation((data) => {
      if (data) {
        setPosition([data.latitude, data.longitude]);
      }
    });
  }, [setPosition, locationDenied, isLocationInitialized]);

  useEffect(() => {
    let isMounted = true;

    const setupLocation = async () => {
      if (locationDenied) return;

      if (locationUpdateInterval.current) {
        clearInterval(locationUpdateInterval.current);
      }

      const hasPermission = await initialLocationRequest();
      if (hasPermission && isMounted) {
        updateLocation();

        locationUpdateInterval.current = setInterval(updateLocation, 60000);
      }
    };

    setupLocation();

    return () => {
      isMounted = false;
      if (locationUpdateInterval.current) {
        clearInterval(locationUpdateInterval.current);
      }
    };
  }, [initialLocationRequest, updateLocation, locationDenied]);

  return { locationDenied, isLocationInitialized };
};
