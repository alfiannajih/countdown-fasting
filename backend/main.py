from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests
from dotenv import load_dotenv

import os

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    os.getenv("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



async def search_timings(query: str) -> dict:
    """
    Retrieves the prayer timings for a given address.

    Args:
        query (str): The address to search for.

    Returns:
        dict: A dictionary containing the prayer timings.
    """
    # URL of the Al-Ahdhan API
    url = "http://api.aladhan.com/v1/timingsByAddress"

    # Payload data containing the address
    payload = {
        "address": query
    }

    # Send a GET request to the API and retrieve the response in JSON format
    response = requests.get(url, params=payload).json()

    # Return the "data" field from the response
    return response["data"]



async def reverse_geo_loc(lat: float, lon: float) -> dict:
    """
    Reverse geolocates a given latitude and longitude.

    Args:
        lat (float): The latitude.
        lon (float): The longitude.

    Returns:
        dict: A dictionary containing the reverse geocoded information.
    """
    # The URL of the Nominatim OpenStreetMap API
    url = "https://nominatim.openstreetmap.org/reverse"

    # The payload data containing the latitude and longitude
    payload = {
        "lat": lat,
        "lon": lon,
        "format": "json",  # The format of the response
        "zoom": "8"  # The zoom level of the map
    }

    # Send a GET request to the API and retrieve the response in JSON format
    response = requests.get(url, params=payload).json()

    # Return the reverse geocoded information
    return response

async def search_time_zone(timezone: str) -> dict:
    """
    Retrieves the time zone data for a given timezone.

    Args:
        timezone (str): The timezone to search for.

    Returns:
        dict: A dictionary containing the time zone data.
    """
    # The URL of the IP Geolocation API
    url = "https://api.ipgeolocation.io/timezone"

    # The payload data containing the timezone
    payload = {
        "tz": timezone,
        # The API key is obtained from the environment variables
        "apiKey": os.getenv("IPGEOLOCATION_API_KEY")
    }

    # Send a GET request to the API and retrieve the response in JSON format
    response = requests.get(url, params=payload).json()

    # Return the time zone data
    return response


@app.get("/api/timings")
async def timings(query: str) -> dict:
    """
    Retrieves the prayer timings, timezone, coordinates and display location
    for a given query.

    Args:
        query (str): The address to search for.

    Returns:
        dict: A dictionary containing the prayer timings, timezone,
        coordinates and display location.
    """
    # Initialize the response dictionary
    response = {}

    # Fetch the prayer timings for the given query
    timings_response = await search_timings(query)

    # Extract the Maghrib and Fajr timings from the response
    response["timings"] = {
        "Maghrib": timings_response["timings"]["Maghrib"],
        "Fajr": timings_response["timings"]["Fajr"]
    }

    # Extract the timezone from the timings response
    response["timezone"] = timings_response["meta"]["timezone"]

    # Extract the latitude and longitude from the timings response
    response["coordinates"] = {
        "latitude": timings_response["meta"]["latitude"],
        "longitude": timings_response["meta"]["longitude"]
    }

    # Fetch the timezone offset for the given timezone
    timezone_response = await search_time_zone(response["timezone"])
    response["timezone_offset"] = timezone_response["timezone_offset"]

    # Fetch the reverse geolocation for the given coordinates
    reverse_geo_loc_response = await reverse_geo_loc(
        response["coordinates"]["latitude"],
        response["coordinates"]["longitude"]
    )

    # Extract the display location from the reverse geolocation response
    display_location = reverse_geo_loc_response["display_name"].split(",")
    response["display_location"] = (
        f"{display_location[0]}, {display_location[1]} ({response['timezone']})"
    )

    # Return the response dictionary
    return response
