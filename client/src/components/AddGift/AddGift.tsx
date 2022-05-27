import React, {FormEvent, useState} from 'react';
import {CreateGiftReq, GiftEntity} from "types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Spinner} from "../comon/Spinner/Spinner";
import Grid from '@mui/material/Grid';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {addGiftAsync} from "../../redux/features/gifts-slice";

export const AddGift = () => {
    const dispatch = useAppDispatch()
    const giftsList = useAppSelector((state: RootState) => state.gifts)

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


    const sendForm = async (e: FormEvent) => {
        e.preventDefault()
        setNameError(false)
        setCountError(false)
        
        if (!form.name || form.name.length < 3 || form.name.length > 55) {
            setNameError(true)
        } else if (!form.count || form.count < 1 || form.count > 999999) {
            setCountError(true)
        } else {
            dispatch(addGiftAsync(form))
        }

    }




    return <form noValidate autoComplete="off" onSubmit={sendForm}>

        <Grid container spacing={2} sx={{maxWidth: '600px', }}>
            <Grid item xs={12}  md={6}>
                <TextField
                    sx={{width: '100%'}}
                    value={form.name}
                    label="Add Gift"
                    variant='outlined'
                    color='primary'
                    size="small"
                    required
                    error={nameError}
                    onChange={e => updateForm('name', e.target.value)}/>
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
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
            <Grid item xs={6} md={3} sx={{display: "flex", alignItems: "center"}}>
                <Button type="submit" color="primary" variant='contained'>Add Gift</Button>
            </Grid>

        </Grid>

    </form>
}
