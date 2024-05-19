import { useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
export default function DetectClick() {
  const navigate = useNavigate()

  

  useMapEvents({
    click(e) {
      navigate(`/app/form/${e.latlng.lat}/${e.latlng.lng}`)
    }
  })

}