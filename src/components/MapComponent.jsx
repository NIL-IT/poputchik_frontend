import { YMaps, Map } from "@pbe/react-yandex-maps";
export default function MapComponent() {
  return (
    <div className='w-full h-full'>
      <YMaps query={{ apikey: "6339ca58-3537-4f94-b069-a82968dfb362" }}>
        <Map
          width={"100%"}
          height={"60%"}
          defaultState={{ center: [55.030481046452564, 82.92470047016988], zoom: 15 }}></Map>
      </YMaps>
    </div>
  );
}
