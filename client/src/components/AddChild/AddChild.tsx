import React, {FormEvent,useRef, useEffect, useState} from 'react';
import {CreateChildReq, ChildEntity} from "types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Spinner} from "../comon/Spinner/Spinner";
import Grid from '@mui/material/Grid';
import { ChildGiftSelect } from '../ChildGiftSelect/ChildGiftSelect';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from 'src/app/store';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import { addChildAsync, getChildrenAsync } from '../../redux/features/children-slice';



export const AddChild = () => {
    const [nameError, setNameError] = useState<boolean>(false)  
    const [selectedGiftId, setSelectedGiftId] = useState<string>('')
    const isMounted = useRef(false);
    const dispatch = useAppDispatch()

    const initialFormState = {
name: '',
giftId: selectedGiftId
    }
    
    const [form, setForm] = useState<CreateChildReq>({
        name: "",
        giftId: selectedGiftId
    })
    const clearForm = () => {
        setForm(initialFormState)
        setSelectedGiftId('')
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    useEffect(() => {
        if (isMounted.current) {
            setForm({...form,
                giftId: selectedGiftId,})   
        } else {
          isMounted.current = true;
        }
      }, [selectedGiftId]);


    const sendForm = async (e: FormEvent) => {
        
        e.preventDefault()
        setNameError(false)
        
        if (!form.name || form.name.length < 3 || form.name.length > 55) {
            setNameError(true)
            toast.error('Name must be between 3 and 55 letters long!')
        } else {
            dispatch(addChildAsync(form))
            clearForm()
        }
    }


    return <form noValidate autoComplete="off" onSubmit={sendForm}>
        <Grid container sx={{maxWidth: '800px', }}>
            <Grid item sm={12}  md={4}>
            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                <TextField
                    sx={{width: '100%'}}
                    value={form.name}
                    label="Child's Name"
                    variant='outlined'
                    color='primary'
                    size='small'
                    required
                    error={nameError}
                    onChange={e => updateForm('name', e.target.value)}/>
                    </FormControl>
            </Grid>
            <Grid item sm={12}  md={4}>
                <ChildGiftSelect childId={''} selectedId={''} setSelectedGiftId={setSelectedGiftId}/>
            </Grid>
            <Grid item sm={12} md={4} sx={{display: "flex", alignItems: "center", padding: "0 20px"}}>
                <Button type="submit" color="primary" variant='contained'>Add Child</Button>
            </Grid>

        </Grid>

    </form>
}
