import React, {useEffect, useState} from 'react';
import {BinanceSingleCryptoData} from "../../../types/crypto-data";
export const CryptoPrice = () => {
    const [data, setData] = useState<BinanceSingleCryptoData[] | null>(null);

    useEffect(()=> {
        (async ()=> {
            const fetchData = await fetch('https://api2.binance.com/api/v3/ticker/24hr', {

            })
            const data = await fetchData.json();
            setData(data)
        })()
    }, [])

    if (data === null) {
        return <p>Wczytywanie danych...</p>
    }

  return (
      <label >
          Wybierz parę kryptowalutową: <br/>
          <select>
              {
                  data.map(pair => (
                      <option
                          value={pair.symbol}
                          key={pair.symbol}
                      >
                          {pair.symbol}
                      </option>
                  ))
              }
          </select>
      </label>
  )
}
