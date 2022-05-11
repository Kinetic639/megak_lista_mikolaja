import React, {FormEvent, useState} from 'react';
import {CreateGiftReq, GiftEntity} from "types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Spinner} from "../comon/Spinner/Spinner";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddGift = () => {
    const [form, setForm] = useState<CreateGiftReq>({
        name: "",
        count: 0
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [resultInfo, setResultInfo] = useState('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [countError, setCountError] = useState<boolean>(false)


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
            setLoading(true)

            const res = await fetch(`${process.env.HOST}/gifts`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            })
            const data: GiftEntity = await res.json()
            setLoading(false)
            setResultInfo(`Gift ${data.name} has been added.`)
            handleClick()
        }


    }

    if (loading) {
        return <Spinner/>
    }


    return <form noValidate autoComplete="off" onSubmit={sendForm}>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={3000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                {resultInfo}
            </Alert>
        </Snackbar>
        <Grid container spacing={2} sx={{maxWidth: '600px', }}>
            <Grid item xs={12}  md={6}>
                <TextField
                    sx={{width: '100%'}}
                    value={form.name}
                    label="Add Gift"
                    variant='outlined'
                    color='primary'
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
