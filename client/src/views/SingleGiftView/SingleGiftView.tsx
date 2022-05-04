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
            const res = await fetch(`http://localhost:3001/gifts/${giftId}`)
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
        <h1>{giftInfo.gift.id}</h1>
        <h1>{giftInfo.gift.name}</h1>
        <h1>{giftInfo.gift.count}</h1>
    </>
}
