export const getDirections = async (origin, destinations) => {

  const url = getUrl([origin, ...destinations, origin])
  const query = await fetch(url);
  const json = await query.json();
  return json;
}

const getUrl = (coors) => {
  if (!coors) return;
  //const coorString = '-81.673584,41.512393;-81.577167,41.508132'
  const coorString =  coors.join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coorString}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZXJpY3lhcmhhbSIsImEiOiJjbGVtdWN2MHIwMDE2M3hsazA2aGt0YXN3In0.62ElsBzews_TTWShyekDUQ`
  return url;
  // const req= 'https://api.mapbox.com/directions/v5/mapbox/driving/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1IjoiZXJpY3lhcmhhbSIsImEiOiJjbGVtdWN2MHIwMDE2M3hsazA2aGt0YXN3In0.62ElsBzews_TTWShyekDUQ'  
}