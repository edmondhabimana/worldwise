import { useMap } from "react-leaflet";

export default function ChangeMapPosition({position}) {
  const map = useMap();
  map.setView(position)
  // return null
}