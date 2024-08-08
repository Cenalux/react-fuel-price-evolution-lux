import React, { useEffect, useState } from "react";

const LiveTimer = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    return (
        <>
            <h3>Current Time: {time}</h3>
        </>
    )
}

export default LiveTimer;