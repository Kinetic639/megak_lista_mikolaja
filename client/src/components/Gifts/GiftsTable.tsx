import React from 'react';
import {GiftEntity} from 'types';
import {GiftsTableRow} from './GiftsTableRow';

interface Props {
    gifts: GiftEntity[];
    onGiftsChange: () => void;
}

export const GiftsTable = (props: Props) => (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
            props.gifts.map((gift) => <GiftsTableRow key={gift.id} onGiftsChange={props.onGiftsChange} gift={gift}/>)
        }
        </tbody>
    </table>
)
