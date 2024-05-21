export const reverseGeo = async (_lat, _lng) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_lat},${_lng}&key=${import.meta.env.VITE_API_KEY}`
    )
    if (!res.ok) throw Error("Failed getting menu");


    const coordsInfo = await res.json()
    // console.log('coordsInfo', coordsInfo);
    if(coordsInfo.results.length <= 4){
      return "error"
    } else {
      const locationInfo = []
      const country = coordsInfo.results.at(-1).address_components[0].long_name
      // console.log('country', country);
      const answer = isNaN(Number(coordsInfo.results.at(-4).address_components[0].long_name))
      if(country === 'Canada'){
        locationInfo.push(coordsInfo.results.at(-4).address_components[1].long_name);
      } else if(country === 'United States'){
        if(answer) {
          locationInfo.push(coordsInfo.results.at(-4).address_components[0].long_name);
        } else {
          locationInfo.push(coordsInfo.results.at(-4).address_components[1].long_name);
        }
      } else if(country === 'Brazil'){
        const city = coordsInfo.results.at(-4).address_components[0].long_name.split('-')
        const joinCity = city.join('')
        const isBrazilCityANumber = isNaN(Number(joinCity))

        if(isBrazilCityANumber){
          locationInfo.push(coordsInfo.results.at(-4).address_components[0].long_name);
        } else {
          locationInfo.push(coordsInfo.results.at(-4).address_components[1].long_name);
        }
      } else {
        locationInfo.push(coordsInfo.results.at(-4).address_components[0].long_name);
      }

      locationInfo.push(coordsInfo.results.at(-1).address_components[0].long_name);
      locationInfo.push(coordsInfo.results.at(-1).address_components[0].short_name);

      return locationInfo
    }

}