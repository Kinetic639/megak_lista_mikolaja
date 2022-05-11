import React, {MouseEvent, useState} from 'react';
import {GiftEntity} from 'types';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {
    NavLink as RouterLink,
} from 'react-router-dom';

interface Props {
    gift: GiftEntity;
    onGiftsChange: () => void;
}

export const GiftsTableRow = ({gift, onGiftsChange}: Props) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteGift = async (e: MouseEvent) => {
        e.preventDefault()


        const res = await fetch(`${process.env.HOST}/gifts/${gift.id}`, {
            method: 'DELETE'
        })
        if ([400, 500].includes(res.status)) {
            const error = await res.json()
            alert(`Error occurred: ${error.message}`)
        }
        onGiftsChange()
    }

    return (
        <>
            <Dialog
                open={open}
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
                <td>{gift.name}</td>
                <td>{gift.count}</td>
                <td>
                    <Button component={RouterLink} to={`/gifts/${gift.id}`} variant="outlined">
                        <EditIcon/>
                    </Button>
                </td>
                <td><Button onClick={handleClickOpen} variant="outlined" color="error">
                    <DeleteIcon/>
                </Button></td>
            </tr>
        </>
    )
}
