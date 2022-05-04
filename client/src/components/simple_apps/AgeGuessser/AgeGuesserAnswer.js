import React, {useState, useEffect} from "react";
import axios from 'axios';

export const AgeGuesserAnswer = (props) => {
    const [age, setAge] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState({hits: []});

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await fetch(`https://api.agify.io/?name=${props.name}`);
            const data = await response.json();
            setAge(data.age)

        }

        fetchData();

    }, []);


    return (
        <>
            <p>Twój wiek: {age}</p>
            <p>Twój rok urodzenia: {new Date().getFullYear() - age}</p>
        </>
    )
}


