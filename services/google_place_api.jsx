export const GetPhotoRef = async(plaecName)=>{
   const res = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+plaecName+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);

   const result = await res.json();
   return result
}