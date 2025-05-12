import { useEffect, useState, useCallback } from "react";
import { useMap } from "../state/MapRoutesStore";

export function useTelegramLocation() {
  const { setPosition } = useMap();
  const [status, setStatus] = (useState < "idle") | "requesting" | "granted" | "denied" | ("error" > "idle");

  const openSettings = useCallback(() => {
    window.Telegram.WebApp.web_app_open_location_settings();
  }, []);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager) {
      console.error("LocationManager недоступен");
      setStatus("error");
      return;
    }

    // Подписка на событие locationRequested
    tg.onEvent("locationRequested", (data) => {
      if (!data.available) {
        setStatus("denied"); // отказ
      } else {
        setStatus("granted"); // разрешение
        setPosition([data.latitude, data.longitude]);
      }
    });

    // Первый запрос
    setStatus("requesting");
    tg.LocationManager.requestLocation()
      .then((coords) => {
        setStatus("granted");
        setPosition([coords.latitude, coords.longitude]);
      })
      .catch(() => {
        setStatus("denied");
      });
  }, [setPosition]);

  return { status, openSettings };
}
