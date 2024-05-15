export const reverseGeo = async (_lat, _lng) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_lat},${_lng}&key=${import.meta.env.VITE_API_KEY}`
    )
    if (!res.ok) throw Error("Failed getting menu");


    const coordsInfo = await res.json()
    return coordsInfo.results[1].formatted_address.split(',')
}