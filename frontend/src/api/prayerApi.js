import axios from "axios";

let baseUrl
if (process.env.REACT_APP_API_ENDPOINT) {
    baseUrl = process.env.REACT_APP_API_ENDPOINT
} else {
    baseUrl = "http://localhost:8000/api/timings"
}

const searchTimings = async (q) => {
    const search = await axios.get(
        `${baseUrl}?query=${q}`
    )

    return search.data
}

export { searchTimings }