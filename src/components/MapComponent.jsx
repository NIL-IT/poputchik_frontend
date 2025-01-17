import { YMaps, Map } from "@pbe/react-yandex-maps";
import { API_KEY } from "../api/api";
export default function MapComponent() {
  return (
    <div className='w-full h-full'>
      <YMaps query={{ apikey: API_KEY }}>
        <Map
          width={"100%"}
          height={"60%"}
          state={{ center: [51.957804, 85.960634], zoom: 15 }}
          options={{
            behaviors: [
              "disable('drag')",
              "disable('scrollZoom')",
              "disable('multiTouch')",
              "disable('rightMouseButtonMagnifier')",
            ],
            controls: [],
          }}></Map>
      </YMaps>
    </div>
  );
}
