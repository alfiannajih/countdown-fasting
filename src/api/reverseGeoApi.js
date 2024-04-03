import axios from "axios";

const baseUrl = "https://api.geoapify.com/v1/geocode/reverse"
const apiKey = "0557339565a74704aa29299b655c01aa"

export const fetchGeoData = async (latitude, longitude) => {
    const location = await axios.get(
        `${baseUrl}?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
    )
    
    return location.data
}