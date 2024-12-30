import React, { useState, useEffect } from "react";

export const RegTimer = ({deadline,compName}) => {
   
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    

    const getTime = (deadline) => {
        const time = Date.parse(deadline) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor(time / (1000 * 60 * 60) % 24));
        setMinutes(Math.floor(time / (1000 * 60) % 60));
        setSeconds(Math.floor(time / (1000) % 60));
    };
    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, [deadline]);
    return (
        <div className="text-[15px] text-[#0DB256]">
            {(days <= 1 && days >= 0) ? (
                <div className="flex">
                    <p>{hours}:</p>
                    <p>{minutes}:</p>
                    <p>{seconds}</p>
                </div>
            ) : ((days < 5 && days > 0) ? (
                <div className="flex justify-center items-center ">
                    <p>{days}d</p>
                    <p>{hours}h</p>
                    <p>{minutes}m</p>
                    <p>{seconds}s</p>

                </div>
            ) : ((days > 0) ? (
                <div>{days}days</div>
            ) : (
                <div></div>
            )
            ))
            }
        </div >
    );
};

export const RunningTimer = ({deadline}) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = (deadline) => {
        const time = Date.parse(deadline) - Date.now();
        setHours(Math.floor(time / (1000 * 60 * 60) % 24));
        setMinutes(Math.floor(time / (1000 * 60) % 60));
        setSeconds(Math.floor(time / (1000) % 60));
    };
    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, [deadline]);
    return (
        <div className="text-sm text-[#0DB256]">
            {(hours < 3 && hours >= 0) ? (
                <div className="flex">
                    <p>{hours}:</p>
                    <p>{minutes}:</p>
                    <p>{seconds}</p>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );

};;