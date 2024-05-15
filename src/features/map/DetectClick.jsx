import { useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
export default function DetectClick() {
  const navigate = useNavigate()

  

  useMapEvents({
    click(e) {
      // console.log(e);
      // navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      navigate(`/app/form/${e.latlng.lat}/${e.latlng.lng}`)
      // setCoord(e.latlng)
      // setLat(e.latlng.lat)
      // setLng(e.latlng.lng)
    }
  })

  // return coord === null ? null : (
  //   <Marker position={coord}>
  //     <Popup>You are here</Popup>
  //   </Marker>
  // )

}