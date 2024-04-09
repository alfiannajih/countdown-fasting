import { useEffect, useState } from "react";

const useCountdown = (targetDate, timezone) => {
    const countDownDate = targetDate - (timezone*60 + new Date().getTimezoneOffset())*60*1000;

    const [countDown, setCountDown] = useState(
        countDownDate - (new Date().getTime())
    );
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);
    
    if (isNaN(countDown)) {
        return "00:00:00"
    }
    return getReturnValues(countDown)
}

const getReturnValues = (countDown) => {
    const hours = Math.floor((countDown % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

const addZero = (number) => {
    var num = '' + number;
    while (num.length < 2) {
        num = '0' + num;
    }
    return num;
}

const formatDate = (oldDate) => {
    const splitDate = oldDate.split("/")
    const day = splitDate[0]
    const month = splitDate[1]
    const year = splitDate[2]

    return `${year}-${addZero(month)}-${addZero(day)}`
  }

export { useCountdown, formatDate }