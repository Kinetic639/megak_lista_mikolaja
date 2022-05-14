import React, {useEffect, useState} from 'react';
import {GetSingleGiftRes} from 'types';
import {useParams} from 'react-router-dom'
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    NavLink as RouterLink,
} from 'react-router-dom';

export const SingleGiftView = () => {
    const [giftInfo, setGiftInfo] = useState<GetSingleGiftRes | null>(null)
    const {giftId} = useParams()

    useEffect(() => {
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/gifts/${giftId}`)
            const data = await res.json()
            setGiftInfo(data)
        })()
    }, [giftId])

    if (giftInfo === null) {
        return null
    }


    return <>
        <Button
            component={RouterLink} to={'/gifts'} variant="outlined" sx={{borderColor: 'transparent'}}>
            <ArrowBackIosIcon/> Go back
        </Button>
        <h2>Name: {giftInfo.gift.name}</h2>
        <h5>id: {giftInfo.gift.id}</h5>
        <h3>Total: {giftInfo.gift.count} Given: {giftInfo.givenCount} </h3>

    </>
}
