import axios from "axios";

const baseUrl = "https://countdown-fasting-production.up.railway.app/api/timings"

const searchTimings = async (q) => {
    const search = await axios.get(
        `${baseUrl}?query=${q}`
    )

    return search.data
}

export { searchTimings }