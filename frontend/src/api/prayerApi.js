import axios from "axios";

let baseUrl
if (process.env.REACT_APP_API_ENDPOINT) {
    baseUrl = process.env.REACT_APP_API_ENDPOINT
} else {
    baseUrl = "http://localhost:8000/api/timings"
}

/**
 * Function to search for prayer timings based on a query string.
 *
 * @param {string} q - The query string to search for.
 * @return {Promise} A promise that resolves to the search results.
 */
const searchTimings = async (q) => {
    // Send a GET request to the API endpoint with the query string as a parameter.
    const search = await axios.get(
        `${baseUrl}?query=${q}`
    )

    // Return the data from the API response.
    return search.data
}

export { searchTimings }