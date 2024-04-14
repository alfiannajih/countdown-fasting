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
    "https://countdown-ramadhan-fasting.netlify.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

async def search_timings(query):
    url = "http://api.aladhan.com/v1/timingsByAddress"
    payload = {
        "address": query
    }

    response = requests.get(url, params=payload).json()

    return response["data"]

async def reverse_geo_loc(lat, lon):
    url = "https://nominatim.openstreetmap.org/reverse"
    payload = {
        "lat": lat,
        "lon": lon,
        "format": "json",
        "zoom": "8"
    }

    response = requests.get(url, params=payload).json()

    return response

async def search_time_zone(timezone):
    url = "https://api.ipgeolocation.io/timezone"
    payload = {
        "tz": timezone,
        "apiKey": os.getenv("IPGEOLOCATION_API_KEY")
    }

    response = requests.get(url, params=payload).json()

    return response

@app.get("/api/timings")
async def timings(query: str):
    response = {}

    timings_response = await search_timings(query)
    response["timings"] = {
        "Maghrib": timings_response["timings"]["Maghrib"],
        "Fajr": timings_response["timings"]["Fajr"]
    }
    
    response["timezone"] = timings_response["meta"]["timezone"]
    response["coordinates"] = {
        "latitude": timings_response["meta"]["latitude"],
        "longitude": timings_response["meta"]["longitude"]
    }

    timezone_response = await search_time_zone(response["timezone"])
    response["timezone_offset"] = timezone_response["timezone_offset"]

    reverse_geo_loc_response = await reverse_geo_loc(response["coordinates"]["latitude"], response["coordinates"]["longitude"])
    display_location = reverse_geo_loc_response["display_name"].split(",")
    response["display_location"] = f"{display_location[0]}, {display_location[1]} ({response['timezone']})"

    return response