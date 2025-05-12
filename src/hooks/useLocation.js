import { useState, useEffect, useCallback, useRef } from "react";
import { useMap } from "../state/MapRoutesStore";

export const useLocation = () => {
  const { setPosition } = useMap();
  const [isLocationInitialized, setIsLocationInitialized] = useState(false);
  const [locationDenied, setLocationDenied] = useState(localStorage.getItem("locationPermission") === "denied");
  const initializationInProgress = useRef(false);

  const initialLocationRequest = useCallback(async () => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || locationDenied || initializationInProgress.current) {
      return false;
    }

    try {
      initializationInProgress.current = true;

      // Проверяем, есть ли уже разрешение
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
    let intervalId;

    const setupLocation = async () => {
      if (locationDenied) return;

      const hasPermission = await initialLocationRequest();
      if (hasPermission) {
        updateLocation();
        intervalId = setInterval(updateLocation, 10000);
      }
    };

    setupLocation();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [initialLocationRequest, updateLocation, locationDenied]);

  return { locationDenied, isLocationInitialized };
};
