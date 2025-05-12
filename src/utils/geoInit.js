let isGeoInitialized = false;

export async function initializeGeo(setPosition) {
  if (isGeoInitialized) return;
  isGeoInitialized = true;
  const tg = window.Telegram.WebApp;
  if (!tg?.LocationManager) throw new Error("No LocationManager");

  await new Promise((resolve) => tg.LocationManager.init(resolve));
  tg.LocationManager.getLocation((data) => data && setPosition([data.latitude, data.longitude]));
  const id = setInterval(
    () => tg.LocationManager.getLocation((data) => data && setPosition([data.latitude, data.longitude])),
    10000,
  );
}
