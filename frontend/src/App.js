import './App.css';
import { useState, useEffect } from "react";
import { searchTimings } from "./api/prayerApi";
import { useCountdown, formatDate } from './hooks/useCountdown';
import { locationIcon, timeIcon } from './Icon';

const App = () => {
  const [address, setAddress] = useState("")
  const [locTime, setLocTime] = useState("")
  const [location, setLocation] = useState([null])
  const [timeZoneOffset, setTimeZoneOffset] = useState("")

  useEffect(() => {
    const defaultTime = async () => {
      const tempTime = await searchTimings("Gambir, Jakarta Pusat")
      setLocTime(tempTime.timings)
      
      setTimeZoneOffset(tempTime.timezone_offset)

      setLocation(tempTime.display_location)
    }
    defaultTime()
  }, [])

  const searchLocalTime = (offset) => {
    const currentDate = new Date().getTime() + 1000*3600*offset
    const formatted = new Date(currentDate).toLocaleString("id-ID", {timeZone: "UTC"})

    return formatted.split(", ")
  }

  const search = async (add) => {
    const queryAdd = await searchTimings(add)
    setLocTime(queryAdd.timings)

    setTimeZoneOffset(queryAdd.timezone_offset)

    setLocation(queryAdd.display_location)
  }

  const Timer = () => {
    const currentDate = formatDate(searchLocalTime(timeZoneOffset)[0])
    const currentTime = searchLocalTime(timeZoneOffset)[1].split(".")
    const currentMaghrib = new Date(`${currentDate}T${locTime.Maghrib}`).getTime()
    const currentFajr = new Date(`${currentDate}T${locTime.Fajr}`).getTime()
    
    const currentTiming = new Date(`${currentDate}T${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`).getTime()

    let targetTime = currentMaghrib
    let nextCommand = "Fasting end in"
    if (currentTiming > currentMaghrib || currentTiming < currentFajr) {
      targetTime = currentFajr + 24*3600*1000
      nextCommand = "Next fasting in"
    }

    return (
      <div>
        <div className="Countdown-command">{ nextCommand }</div>
        <div className='Countdown-timer'>
          { useCountdown(targetTime, timeZoneOffset) }
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="Countdown-container">
      <h1>Countdown Ramadhan Fasting</h1>
        <div className="Countdown-search-wrapper">
          <input
            className='Search-input'
            placeholder='Enter city name'
            onChange={({ target }) => setAddress(target.value)}
          />
          <input
            className='Search-button'
            type="button"
            value="Search"
            onClick={() => search(address)}
          />
        </div>
        <div className="Countdown-wraper">
          { Timer() }
          <div className="Additional-Information">
            <div className="Countdown-location">{ locationIcon(25) }{ location }</div>
            <div className="Countdown-timezone">{ timeIcon(25) }{ searchLocalTime(timeZoneOffset)[0] } ({ searchLocalTime(timeZoneOffset)[1].slice(0, -3) })</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
