import React, {FormEvent, useState} from 'react';
import {CreateChildReq, ChildEntity} from "types";
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

export const AddChild = () => {
    const [form, setForm] = useState<CreateChildReq>({
        name: "",
        giftId: ''
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [resultInfo, setResultInfo] = useState('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [giftError, setGiftError] = useState<boolean>(false)


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
        // setCountError(false)
    //
        if (!form.name || form.name.length < 3 || form.name.length > 55) {
            setNameError(true)
    //     } else if (!form.count || form.count < 1 || form.count > 999999) {
    //         setCountError(true)
        } else {
            setLoading(true)

            const res = await fetch(`http://localhost:3001/children`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            })
            const data: ChildEntity = await res.json()
            setLoading(false)
            setResultInfo(`Child ${data.name} has been added.`)
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
        <Grid container sx={{maxWidth: '400px', }}>
            <Grid item xs={12}  md={7}>
                <TextField
                    sx={{width: '100%'}}
                    value={form.name}
                    label="Child's Name"
                    variant='outlined'
                    color='primary'
                    required
                    error={nameError}
                    onChange={e => updateForm('name', e.target.value)}/>
            </Grid>
            <Grid item xs={6} md={5} sx={{display: "flex", alignItems: "center", padding: "5px 20px"}}>
                <Button type="submit" color="primary" variant='contained'>Add Child</Button>
            </Grid>

        </Grid>

    </form>
}
