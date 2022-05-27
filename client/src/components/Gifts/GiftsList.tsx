import React from 'react';
import {GiftsTable} from './GiftsTable';
import {Spinner} from "../comon/Spinner/Spinner";
import { RootState } from '../../app/store';
import {  useAppSelector } from '../../app/hooks';

export const GiftsList = () => {
    const giftsList = useAppSelector((state: RootState) => state.gifts)
    

    if (giftsList.status === 'loading') {
        return <Spinner/>
    }
    return <>
        <h1>Gifts:</h1>
        <GiftsTable giftsList={giftsList.gifts}/>
    </>
}
