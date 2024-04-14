import axios from "axios";

const baseUrl = "https://countdown-fasting.up.railway.app/api/timings"
//const baseUrl = "http://127.0.0.1:8000/api/timings"

const searchTimings = async (q) => {
    const search = await axios.get(
        `${baseUrl}?query=${q}`
    )

    return search.data
}

export { searchTimings }