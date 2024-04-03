import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return countDownDate - new Date().getTime();
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

const convertTimezone = (timezone) => {
    const tempDate = new Date().toLocaleString("id-ID", {timeZone: timezone}).split(",")[0]
    
    const currentDate = tempDate.split("/")

    return `${currentDate[2]}-${addZero(currentDate[1])}-${addZero(currentDate[0])}`
} 

export { useCountdown, convertTimezone }