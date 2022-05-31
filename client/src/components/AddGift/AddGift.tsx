import React, {FormEvent, useState} from 'react';
import {CreateGiftReq} from "types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useAppDispatch} from "../../app/hooks";
import {addGiftAsync} from "../../redux/features/gifts-slice";
import { toast } from 'react-toastify';

export const AddGift = () => {
    const dispatch = useAppDispatch()

    const [form, setForm] = useState<CreateGiftReq>({
        name: "",
        count: 0
    })
    const [nameError, setNameError] = useState<boolean>(false)
    const [countError, setCountError] = useState<boolean>(false)
    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    } 
    
    const clearForm = () => {
        setForm({
            name: "",
            count: 0
        })
    }


    const sendForm = async (e: FormEvent) => {
        e.preventDefault()
        setNameError(false)
        setCountError(false)
        
        if (!form.name || form.name.length < 3 || form.name.length > 25) {
            setNameError(true)
            toast.error("Gift's name must be between 3 and 55 letters long!")
        } else if (!form.count || form.count < 1 || form.count > 999999) {
            setCountError(true)
            toast.error("Amount must be between 1 and 999999!")
        } else {
            dispatch(addGiftAsync(form))
            clearForm()
        }
       
    }




    return <form noValidate autoComplete="off" onSubmit={sendForm}>

        <Grid container spacing={2} sx={{maxWidth: '500px', }}>
            <Grid item xs={12}  sm={6}>
                <TextField 
                    sx={{width: '100%', maxWidth: '320px'}}
                    value={form.name}
                    label="Add Gift"
                    variant='outlined'
                    color='primary'
                    size="small"
                    required
                    error={nameError}
                    onChange={e => updateForm('name', e.target.value)}/>
            </Grid>
            <Grid item  >
                <TextField sx={{maxWidth: '80px'}}
                    value={form.count}
                    label="Count"
                    type="number"
                    variant='outlined'
                    required
                    size="small"
                    color='primary'
                    error={countError}
                    onChange={e => updateForm('count', e.target.value)}/>
            </Grid>
            <Grid item  sx={{display: "flex", alignItems: "center"}}>
                <Button sx={{width: '100%'}} type="submit" color="primary" variant='contained'>Add Gift</Button>
            </Grid>

        </Grid>

    </form>
}
