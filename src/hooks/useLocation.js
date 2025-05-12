import { useState, useEffect, useCallback } from "react";
import { useMap } from "../state/MapRoutesStore";

export const useLocation = () => {
  const { setPosition } = useMap();
  const [isLocationInitialized, setIsLocationInitialized] = useState(false);
  const [locationDenied, setLocationDenied] = useState(localStorage.getItem("locationPermission") === "denied");

  const initialLocationRequest = useCallback(async () => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || locationDenied) {
      return false;
    }

    if (isLocationInitialized) {
      return tg.LocationManager.isLocationAvailable;
    }

    try {
      const result = await new Promise((resolve) => {
        tg.LocationManager.init((error) => {
          if (error) {
            localStorage.setItem("locationPermission", "denied");
            setLocationDenied(true);
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });

      if (!result) return false;

      const isAvailable = tg.LocationManager.isLocationAvailable;
      if (!isAvailable) {
        localStorage.setItem("locationPermission", "denied");
        setLocationDenied(true);
      } else {
        localStorage.setItem("locationPermission", "granted");
        setIsLocationInitialized(true);
      }

      return isAvailable;
    } catch (error) {
      console.error("Ошибка инициализации LocationManager:", error);
      localStorage.setItem("locationPermission", "denied");
      setLocationDenied(true);
      return false;
    }
  }, [locationDenied, isLocationInitialized]);

  const updateLocation = useCallback(() => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || locationDenied) return;

    tg.LocationManager.getLocation((data) => {
      if (data) {
        setPosition([data.latitude, data.longitude]);
      }
    });
  }, [setPosition, locationDenied]);

  useEffect(() => {
    let intervalId;

    const setupLocation = async () => {
      if (!locationDenied) {
        const hasPermission = await initialLocationRequest();
        if (hasPermission) {
          updateLocation();
          intervalId = setInterval(updateLocation, 10000);
        }
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
