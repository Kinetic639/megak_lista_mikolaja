import React, {MouseEvent, useState, useEffect, Dispatch, SetStateAction} from 'react';
import {GiftEntity, ChildEntity} from 'types';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteGiftAsync} from "../../redux/features/gifts-slice";
import './giftsRow.scss'
import { RootState } from '../../app/store';
import { getChildrenAsync } from '../../redux/features/children-slice';
interface Props {
    gift: GiftEntity;
    setEditableGiftElement:Dispatch<SetStateAction<string | undefined>>
}

export const GiftsReadOnlyTableRow = ({gift, setEditableGiftElement}: Props) => {
    const dispatch = useAppDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const children = useAppSelector((state: RootState) => state.children.children)
    const newList = children.childrenList

    const handleClickOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const deleteGift = async (e: MouseEvent) => {
        dispatch(deleteGiftAsync(gift))
    }
   
    useEffect(()=>{
        dispatch(getChildrenAsync())
        
    },[])

    

    return (
        <>
            <Dialog
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Confirm Removal`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are You sure You want to remove ${gift.name} from Gifts List?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={deleteGift} autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
            <tr>
                <td className='giftsRow__name'>{gift.name}</td>
                <td className='giftsRow__count'>{gift.count}</td>
                <td className='giftsRow__count'>{newList.filter(child => child.giftId === gift.id).length}</td>
                <td >
                    <Button className='giftsRow__icon' onClick={()=> {setEditableGiftElement(gift.id)}} variant="outlined">
                        <EditIcon/>
                    </Button>
                </td>
                <td><Button className='giftsRow__icon' onClick={handleClickOpen} variant="outlined" color="error">
                    <DeleteIcon/>
                </Button></td>
            </tr>
        </>
    )
}
