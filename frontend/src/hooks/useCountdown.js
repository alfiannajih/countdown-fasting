import { useEffect, useState } from "react";

/**
 * Custom hook to handle the countdown logic.
 *
 * @param {number} targetDate - The target date for the countdown.
 * @param {number} timezone - The timezone offset in hours.
 * @returns {string} - The formatted countdown string.
 */
const useCountdown = (targetDate, timezone) => {
    // Calculate the target countdown date by subtracting the timezone offset and current time.
    const countDownDate = targetDate - (timezone*60 + new Date().getTimezoneOffset())*60*1000;

    // State hook to store the current countdown value.
    const [countDown, setCountDown] = useState(
        countDownDate - (new Date().getTime())
    );
    
    // Effect hook to update the countdown value every second.
    useEffect(() => {
        // Set up an interval to update the countdown value every second.
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts.
        return () => clearInterval(interval);
    }, [countDownDate]);
    
    // If the countdown value is invalid, return "00:00:00" as the default value.
    if (isNaN(countDown)) {
        return "00:00:00"
    }
    
    // Return the formatted countdown string.
    return getReturnValues(countDown)
}

/**
 * Function to convert the countdown value into a formatted string.
 *
 * @param {number} countDown - The countdown value in milliseconds.
 * @return {string} The formatted string in the format "HH:MM:SS".
 */
const getReturnValues = (countDown) => {
    // Calculate the hours, minutes and seconds from the countdown value.
    // The modulo operator is used to calculate the remaining time in a day.
    // The floor function is used to remove the decimal part of the division result.

    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    // Return the formatted string with leading zeroes added using the addZero function.
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

/**
 * Function to add a leading zero to a number.
 *
 * @param {number} number - The number to add a leading zero to.
 * @return {string} The number as a string with a leading zero if necessary.
 */
const addZero = (number) => {
    // Convert the number to a string.
    var num = '' + number;
    
    // Add a leading zero if the number has less than 2 characters.
    // Continue adding zeros until the string has 2 characters.
    while (num.length < 2) {
        num = '0' + num;
    }
    
    // Return the number as a string with a leading zero if necessary.
    return num;
}


/**
 * Function to format a date string from "DD/MM/YYYY" to "YYYY-MM-DD".
 *
 * @param {string} oldDate - The date string in the format "DD/MM/YYYY".
 * @return {string} The formatted date string in the format "YYYY-MM-DD".
 */
const formatDate = (oldDate) => {
    // Split the date string into day, month and year.
    const splitDate = oldDate.split("/")
    const day = splitDate[0]
    const month = splitDate[1]
    const year = splitDate[2]

    // Return the formatted date string in the format "YYYY-MM-DD".
    return `${year}-${addZero(month)}-${addZero(day)}`
}

export { useCountdown, formatDate }