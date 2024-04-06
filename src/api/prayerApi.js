import axios from "axios";

const baseUrl = "http://api.aladhan.com/v1/timingsByAddress"

const searchTimings = async (q, date) => {
    const search = await axios.get(
        `${baseUrl}/${date}?address=${q}`
    )

    return search.data.data
}

export { searchTimings }