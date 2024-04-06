import axios from "axios";

const baseUrl = "https://nominatim.openstreetmap.org/reverse"
const reverseLoc = async (lat, lon) => {
    const search = await axios.get(
        `${baseUrl}?format=json&zoom=8&lat=${lat}&lon=${lon}`
    )

    return search.data
}

const timeZoneUrl = "https://api.ipgeolocation.io/timezone"
const apiKey = "8cdcd965323747268f661a3b4eb7d1a4"
const getTimeZone = async (timezone) => {
    const search = await axios.get(
        `${timeZoneUrl}?apiKey=${apiKey}&tz=${timezone}`
    )

    return search.data
}

export { reverseLoc, getTimeZone }