import axios from "axios";

const baseUrl = "https://countdown-fasting-production.up.railway.app/api/reverse_location"
const reverseLoc = async (lat, lon) => {
    const search = await axios.get(
        `${baseUrl}?lat=${lat}&lon=${lon}`
    )

    return search.data
}

const timeZoneUrl = "https://countdown-fasting-production.up.railway.app/api/time_zone"
const getTimeZone = async (timezone) => {
    const search = await axios.get(
        `${timeZoneUrl}?timezone=${timezone}`
    )

    return search.data
}

export { reverseLoc, getTimeZone }