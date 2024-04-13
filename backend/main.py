from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests
from dotenv import load_dotenv

import os

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
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
    response = await search_timings(query)
    
    return response

@app.get("/api/reverse_location")
async def reverse_location(lat, lon):
    response = await reverse_geo_loc(lat, lon)
    
    return response

@app.get("/api/time_zone")
async def time_zone(timezone):
    response = await search_time_zone(timezone)
    
    return response