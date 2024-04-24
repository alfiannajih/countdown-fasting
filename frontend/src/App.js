import './App.css';
import { useState, useEffect } from "react";
import { searchTimings } from "./api/prayerApi";
import { useCountdown, formatDate } from './hooks/useCountdown';
import { locationIcon, timeIcon } from './Icon';

/**
 * Main component for the Countdown Ramadhan Fasting application.
 * 
 * @returns {JSX.Element} The JSX element representing the Countdown component.
 */
const App = () => {
  // State variables to store user input, location data, and timezone offset.
  const [address, setAddress] = useState("");
  const [locTime, setLocTime] = useState("");
  const [location, setLocation] = useState([null]);
  const [timeZoneOffset, setTimeZoneOffset] = useState("");

  /**
   * Fetches the timings for the default location on component mount.
   */
  useEffect(() => {
    const defaultTime = async () => {
      const tempTime = await searchTimings("Gambir, Jakarta Pusat");
      setLocTime(tempTime.timings);
      setTimeZoneOffset(tempTime.timezone_offset);
      setLocation(tempTime.display_location);
    };
    defaultTime();
  }, []);

  /**
   * Returns the current date and time in the specified timezone.
   * @param {number} offset - The timezone offset in hours.
   * @returns {Array} An array containing the current date and time.
   */
  const searchLocalTime = (offset) => {
    const currentDate = new Date().getTime() + 1000 * 3600 * offset;
    const formatted = new Date(currentDate).toLocaleString("id-ID", {
      timeZone: "UTC",
    });

    return formatted.split(", ");
  };

  /**
   * Searches for timings for the specified location.
   * @param {string} add - The location to search for.
   */
  const search = async (add) => {
    const queryAdd = await searchTimings(add);
    setLocTime(queryAdd.timings);
    setTimeZoneOffset(queryAdd.timezone_offset);
    setLocation(queryAdd.display_location);
  };

  /**
   * Renders the countdown timer component.
   * @returns {JSX.Element} The JSX element representing the countdown timer.
   */
  const Timer = () => {
    const currentDate = formatDate(searchLocalTime(timeZoneOffset)[0]);
    const currentTime = searchLocalTime(timeZoneOffset)[1].split(".");
    const currentMaghrib = new Date(`${currentDate}T${locTime.Maghrib}`).getTime();
    const currentFajr = new Date(`${currentDate}T${locTime.Fajr}`).getTime();
    const currentTiming = new Date(`${currentDate}T${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`).getTime();

    let targetTime = currentMaghrib;
    let nextCommand = "Fasting end in";
    if (currentTiming > currentMaghrib || currentTiming < currentFajr) {
      targetTime = currentFajr + 24 * 3600 * 1000;
      nextCommand = "Next fasting in";
    }

    return (
      <div>
        <div className="Countdown-command">{nextCommand}</div>
        <div className="Countdown-timer">
          {useCountdown(targetTime, timeZoneOffset)}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {/* Render the main component */}
      <div className="Countdown-container">
        <h1>Countdown Ramadhan Fasting</h1>
        <div className="Countdown-search-wrapper">
          {/* Render the search input and button */}
          <input
            className="Search-input"
            placeholder="Enter city name"
            onChange={({ target }) => setAddress(target.value)}
          />
          <input
            className="Search-button"
            type="button"
            value="Search"
            onClick={() => search(address)}
          />
        </div>
        <div className="Countdown-wraper">
          {/* Render the countdown timer and additional information */}
          {Timer()}
          <div className="Additional-Information">
            <div className="Countdown-location">{locationIcon(25)}{" "}
              {location}
            </div>
            <div className="Countdown-timezone">
              {timeIcon(25)}{" "}
              {searchLocalTime(timeZoneOffset)[0]}{" "}
              ({searchLocalTime(timeZoneOffset)[1].slice(0, -3)})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
