import './App.css';
import { useState, useEffect } from "react";
import { searchTimings } from "./api/prayerApi";
import { useCountdown, convertTimezone } from './hooks/useCountdown';

const App = () => {
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState("")
  const [cityTimings, setCityTimings] = useState(null)

  const defaultCity = "Gambir, Jakarta Pusat"
  const currentDate = convertTimezone("Asia/Jakarta")

  console.log(currentDate)
  useEffect(() => {
    searchTimings(defaultCity, currentDate).then((result) => {
      setLocation(defaultCity)
      setCityTimings(result)
    })
  }, [])

  const search = async (q) => {
    const query = await searchTimings(q)

    setLocation(q)
    setCityTimings(query)
  }

  const [targetTimings, setTargetTimings] = useState()

  const GetTiming = () => {
    try {
      let nextCommand

      if (new Date().getTime() > new Date(`${currentDate}T${targetTimings}`).getTime()) {
        setTargetTimings(cityTimings.Imsak)
        nextCommand = "Next Fasting in"
      } else {
        setTargetTimings(cityTimings.Maghrib)
        nextCommand = "Fasting ends in"
      }

      return (
        <div className="Countdown-wraper">
          <div className="Countdown-fasting">{ nextCommand }</div>
          <div className="Countdown-timer">{ targetTimings }</div>
          <div className="Countdown-city">{ location }</div>
        </div>
      )
    } catch(err) {
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
