import { useState, useEffect, useCallback } from "react";
import { useMap } from "../state/MapRoutesStore";

export const useLocation = () => {
  const { setPosition } = useMap();
  const [isInitialized, setIsInitialized] = useState(false);

  const initLocation = useCallback(() => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager) return false;

    return new Promise((resolve) => {
      tg.LocationManager.init((error) => {
        if (error) {
          resolve(false);
        } else {
          setIsInitialized(true);
          resolve(true);
        }
      });
    });
  }, []);

  const updateLocation = useCallback(() => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager || !isInitialized) return;

    tg.LocationManager.getLocation((data) => {
      if (data) {
        setPosition([data.latitude, data.longitude]);
      }
    });
  }, [setPosition, isInitialized]);

  useEffect(() => {
    let intervalId;

    const setup = async () => {
      const hasPermission = await initLocation();
      if (hasPermission) {
        updateLocation();
        intervalId = setInterval(updateLocation, 10000);
      }
    };

    setup();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [initLocation, updateLocation]);

  return { isInitialized };
};
