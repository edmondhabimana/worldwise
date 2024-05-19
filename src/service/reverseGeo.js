export const reverseGeo = async (_lat, _lng) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_lat},${_lng}&key=${import.meta.env.VITE_API_KEY}`
    )
    if (!res.ok) throw Error("Failed getting menu");


    const coordsInfo = await res.json()
    if(coordsInfo.results.length <= 4){
      return "error"
    } else {
      const locationInfo = []

      locationInfo.push(coordsInfo.results.at(-4).address_components[1].long_name);
      locationInfo.push(coordsInfo.results.at(-1).address_components[0].long_name);
      locationInfo.push(coordsInfo.results.at(-1).address_components[0].short_name);

      return locationInfo
    }

}