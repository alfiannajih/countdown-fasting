import './App.css';
import { useState, useEffect } from "react";
import { searchCity } from "./api/prayerApi";
import { useCountdown } from './hooks/useCountdown';
import { fetchGeoData } from './api/reverseGeoApi';

const App = () => {
  const [cityTime, setCityTime] = useState(Object)
  const [address, setAddress] = useState("")
  const [maghribTime, setMaghribTime] = useState("23:59")
  const [location, setLocation] = useState("")

  useEffect(() => {
    searchCity("Monumen Nasional, Jakarta").then((result) => {
      setCityTime(result.data)
    })
  }, [])

  const search = async(q) => {
    const query = await searchCity(q)
    setCityTime(query.data)
  }

  const reverseLoc = async(lat, lon) => {
    const loc = await fetchGeoData(lat, lon)
    setLocation(loc.features[0].properties)
  }

  const GetTiming = () => {
    const today = new Date().toISOString().split("T")[0]
    const countdownTimer = useCountdown(`${today}T${maghribTime}`)
    
    try {
      const lat = cityTime.meta.latitude
      const lon = cityTime.meta.longitude

      reverseLoc(lat, lon)
      console.log(location)
      setMaghribTime(cityTime.timings.Maghrib)
      return (
        <div className="Countdown-wraper">
          <div className="Countdown-fasting">Next fasting in</div>
          <div className="Countdown-timer">{ countdownTimer }</div>
          <div className="Countdown-city">{cityTime.meta.latitude}, {cityTime.meta.longitude}, { location.suburb }</div>
        </div>
      )
    }
    catch(err) {
      return (
        <div className='Countdown-wraper'>
          <div className="Countdown-loading">
            Loading...
          </div>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <div className="Countdown-container">
      <h1>Countdown Ramadhan Fasting</h1>
        <div className="Countdown-search-wrapper">
          <input
            type="Countdown-search"
            placeholder='Enter city name'
            onChange={({ target}) => setAddress(target.value)}
          />
          <input
            type="button"
            value="Search"
            onClick={() => search(address)}
          />
          <GetTiming />
        </div>
      </div>
    </div>
  );
}

export default App;
