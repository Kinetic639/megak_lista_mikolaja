import React, {useState} from "react";
import {AgeGuesserAnswer} from "./AgeGuesserAnswer";

export const AgeGuesser = () => {
    const [name, setName] = useState('');
    const [check, setCheck] = useState(false);

    const sendForm = (e) => {
        e.preventDefault()
        setCheck(true)
    }

    if (check) {
        return <AgeGuesserAnswer name={name}/>
    }

    return <form onSubmit={sendForm}>
        <label>
            Podaj imię: <br/>
            <input type="text"
                   value={name}
                   onChange={e => setName(e.target.value)}
            />
            <button type="submit">Zgadnij wiek</button>
        </label>
    </form>

}
