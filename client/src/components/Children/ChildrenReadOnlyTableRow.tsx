import React, {Dispatch, SetStateAction, MouseEvent, useState} from 'react';
import {ChildEntity, GiftEntity} from 'types';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import {ChildGiftSelect} from '../ChildGiftSelect/ChildGiftSelect'
import { useAppDispatch } from '../../app/hooks';
import { deleteChildAsync } from '../../redux/features/children-slice';

interface Props {
    child: ChildEntity;
    giftsList: GiftEntity[];
    setEditableChildElement: Dispatch<SetStateAction<string | undefined>>;
}

export const ChildrenReadOnlyTableRow = ({child, giftsList, setEditableChildElement}: Props) => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteChild = async (e: MouseEvent) => {
        e.preventDefault()
        setOpen(false);
dispatch(deleteChildAsync(child))

      
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
                        {`Are You sure You want to remove ${child.name} from Children List?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={deleteChild} autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
            <tr>
                <td>
                    <FormControl> 
                        <Typography sx={{paddingLeft: '25px', minWidth: '270px'}}>

                        {child.name}
                        </Typography>
                    </FormControl>
                    </td>
                <td>
                    <ChildGiftSelect childId={child.id as string} selectedId={child.giftId}/>
                </td>
                <td>
                    <Button sx={{width: '70px'}} onClick={()=> {
                        setEditableChildElement(child.id);
                        
                    }} variant="outlined">
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
