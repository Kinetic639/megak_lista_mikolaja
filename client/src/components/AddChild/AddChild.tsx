import React, {FormEvent,useRef, useEffect, useState} from 'react';
import {CreateChildReq} from "types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ChildGiftSelect } from '../ChildGiftSelect/ChildGiftSelect';
import {  useAppDispatch } from '../../app/hooks';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import { addChildAsync } from '../../redux/features/children-slice';



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
        <Grid container sx={{maxWidth: '800px', }} spacing={1}>
            <Grid item xs={12}  md={5} >
            <FormControl sx={{ m: 1 ,maxWidth: 460, minWidth: 250, width: '100%' }} size="small">
                <TextField
                    value={form.name}
                    label="Child's Name"
                    variant='outlined'
                    color='primary'
                    size='small'
                    required
                    error={nameError}
                    InputProps={{ inputProps: { minLength: 3, maxLength: 25}}}
                    onChange={e => updateForm('name', e.target.value)}/>
                    </FormControl>
            </Grid>
            <Grid item  >
                <ChildGiftSelect childId={''} selectedId={''} setSelectedGiftId={setSelectedGiftId}/>
            </Grid>
            <Grid item  sx={{display: "flex", alignItems: "center"}}>
                <Button type="submit" color="primary" variant='contained'>Add Child</Button>
            </Grid>

        </Grid>

    </form>
}
