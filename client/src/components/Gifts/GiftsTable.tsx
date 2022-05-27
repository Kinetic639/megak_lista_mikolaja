import React, {FormEvent, useState} from 'react';
import {GiftEntity, UpdateGiftReq} from 'types';
import {GiftsReadOnlyTableRow} from './GiftsReadOnlyTableRow';
import {GiftsInlineEditTableRow} from "./GiftsInlineEditTableRow";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getSingleGiftAsync, updateGiftAsync} from "../../redux/features/gifts-slice";
import { RootState } from '../../app/store';


interface Props {
    giftsList: GiftEntity[];
}



export const GiftsTable = (props: Props) => {
    const [editableGiftElement,setEditableGiftElement] = useState<string | undefined>('')
    const [editedGift, setEditedGift] = useState<UpdateGiftReq>({
        id: editableGiftElement,
        name: '',
        count: 0
    })
    const children = useAppSelector((state: RootState) => state.children.children)
    const childrenList = children.childrenList
const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(updateGiftAsync(editedGift))
    }
    return (
        <form onSubmit={handleSubmit}>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Count</th>
                <th>Given</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                props.giftsList.map((gift: GiftEntity) => {
                    // dispatch(getSingleGiftAsync(gift.id as string)).then(res => console.log(res.payload.givenCount))
                    return (

                        editableGiftElement === gift.id ?
                        <GiftsInlineEditTableRow key={gift.id} childrenList={childrenList} setEditedGift={setEditedGift} setEditableGiftElement={setEditableGiftElement}  gift={gift}/>
        :
                        <GiftsReadOnlyTableRow key={gift.id} gift={gift} setEditableGiftElement={setEditableGiftElement}/>
                    )
                }



               )
            }
            </tbody>
        </table>
        </form>
    )
}
