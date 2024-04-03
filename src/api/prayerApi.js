import axios from "axios";

const baseUrl = "http://api.aladhan.com/v1/timingsByAddress"

export const searchTimings = async (q, date) => {
    const search = await axios.get(
        `${baseUrl}?address=${q}`
    )

    return search.data.data.timings
}