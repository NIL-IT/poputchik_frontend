export const getCityByCoordinates = async (setCity) => {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${positon[1]},${positon[0]}&format=json`,
    );
    const data = await response.json();

    const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
    if (geoObject) {
      const cityName = geoObject.metaDataProperty.GeocoderMetaData.Address.Components.find(
        (component) => component.kind === "locality",
      )?.name;

      if (cityName) {
        setCity(cityName);
      } else {
        console.log("Не удалось найти название города");
      }
    } else {
      console.log("Не удалось получить данные от геокодера");
    }
  } catch (err) {
    console.log("Ошибка при запросе: " + err);
  }
};

export const initialLocationRequest = async () => {
  const tg = window.Telegram.WebApp;
  if (!tg || !tg.LocationManager) {
    console.error("Telegram WebApp или LocationManager недоступен");
    return false;
  }

  if (!tg.LocationManager.isInited) {
    await new Promise((resolve) => tg.LocationManager.init(resolve));
  }

  if (tg.LocationManager.isLocationAvailable) {
    return true;
  } else {
    console.error("Данные о местоположении недоступны");
    return false;
  }
};

export const updateLocation = (setPosition, setCenter) => {
  const tg = window.Telegram.WebApp;
  if (!tg || !tg.LocationManager) return;

  tg.LocationManager.getLocation((data) => {
    if (data) {
      setPosition([data.latitude, data.longitude]);
      setCenter([data.latitude, data.longitude]);
    }
  });
};
