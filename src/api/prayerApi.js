import axios from "axios";

const baseUrl = "http://api.aladhan.com/v1/timingsByAddress"

export const searchCity = async (q) => {
    const search = await axios.get(
        `${baseUrl}?address=${q}`
    )
    return search.data
}