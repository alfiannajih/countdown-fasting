import './App.css';
import { useState, useEffect } from "react";
import { searchTimings } from "./api/prayerApi";
import { useCountdown } from './hooks/useCountdown';
import { reverseLoc, getTimeZone } from './api/geoLocApi';

const App = () => {
  const [address, setAddress] = useState("Gambir, Jakarta Pusat")
  const [locTime, setLocTime] = useState("")
  const [location, setLocation] = useState([null])
  const [timeZoneOffset, setTimeZoneOffset] = useState("")

  useEffect(() => {
    const defaultTime = async () => {
      const tempTime = await searchTimings(address)
      setLocTime(tempTime.timings)
      
      const tempZone = await getTimeZone(tempTime.meta.timezone)
      setTimeZoneOffset(tempZone.timezone_offset)

      const tempLoc = await reverseLoc(tempTime.meta.latitude, tempTime.meta.longitude)
      setLocation(`${tempLoc.display_name} (${tempTime.meta.timezone})`)
    }
    defaultTime()
  }, [])

  const setLocalTime = (offset) => {
    const currentDate = new Date().getTime() + 1000*3600*offset
    return new Date(currentDate).toLocaleString("id-ID", {timeZone: "UTC"})
  }

  const search = async (add) => {
    const queryAdd = await searchTimings(add)
    setLocTime(queryAdd.timings)

    const queryTime = await getTimeZone(queryAdd.meta.timezone)
    setTimeZoneOffset(queryTime.timezone_offset)

    const queryLoc = await reverseLoc(queryAdd.meta.latitude, queryAdd.meta.longitude)

    const locName = queryLoc.display_name.split(",")
    setLocation(`${locName[0]}, ${locName[1]} (${queryAdd.meta.timezone})`)
  }

  return (
    <div className="App">
      <div className="Countdown-container">
      <h1>Countdown Ramadhan Fasting</h1>
        <div className="Countdown-search-wrapper">
          <input
            type="Countdown-search"
            placeholder='Enter city name'
            onChange={({ target }) => setAddress(target.value)}
          />
          <input
            type="button"
            value="Search"
            onClick={() => search(address)}
          />
          <div className="Countdown-wraper">
            <div className="Countdown-fasting">Fasting ends in </div>
            <div className="Countdown-timer">{ useCountdown(`2024-04-07T${locTime.Maghrib}`, timeZoneOffset) }</div>
            <div className="Additional-Information">
              <div className="Countdown-location">{ location }</div>
              <div className="Countdown-timezone">{ setLocalTime(timeZoneOffset) }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
