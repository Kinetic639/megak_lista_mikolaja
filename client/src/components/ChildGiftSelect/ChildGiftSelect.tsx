import React, {FormEvent, useState} from 'react';
import { GiftEntity, SetGiftForChildReq } from 'types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    giftsList: GiftEntity[];
    selectedId: string;
    childId: string;
}

export const ChildGiftSelect = ({giftsList, childId, selectedId}: Props) => {
    const [selected, setSelected] = useState<string>(selectedId || "")

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value);
    };
    const sendForm = async (e: FormEvent) => {
e.preventDefault()
        await fetch(`${process.env.REACT_APP_API_URL}/children/gift/${childId}`, {
            headers: {
                'content-type': 'application/json'
            },
            method:'PATCH',
            body: JSON.stringify({
                giftId: selected,
            } as SetGiftForChildReq)
        })
    }

return <form>
    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
    <InputLabel id="select-small">Gift</InputLabel>
    <Select
        labelId="select-small"
        id="select-small"
        value={selected}
        label="Gift"
        onChange={handleChange}
    >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        {giftsList.map((gift) => <MenuItem key={gift.id} value={gift.id }>{gift.name}</MenuItem>)}
    </Select>
</FormControl>
    </form>
}
