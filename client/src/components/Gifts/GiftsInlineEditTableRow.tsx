import React, { Dispatch, SetStateAction, useState } from 'react';
import {  GiftEntity, ChildEntity } from 'types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

interface Props {
  gift: GiftEntity;
  childrenList: ChildEntity[];
  setEditableGiftElement: Dispatch<SetStateAction<string | undefined>>;
  setEditedGift: Dispatch<SetStateAction<GiftEntity>>
}

export const GiftsInlineEditTableRow = ({ gift,childrenList, setEditableGiftElement,setEditedGift}: Props) => {
  const [form, setForm] = useState<GiftEntity>({
    id: gift.id,
    name: gift.name,
    count: gift.count,
  });

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };


  return (
    <>
      <tr>
        <td>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <TextField
              value={form.name}
              label="Edit Gift"
              variant="outlined"
              color="primary"
              size="small"
              required
              // error={nameError}
              onChange={(e) => updateForm('name', e.target.value)}
            />
          </FormControl>
        </td>
        <td>
          <TextField
            sx={{ maxWidth: '100px' }}
            value={form.count}
            label="Edit Count"
            type="number"
            variant="outlined"
            required
            color="primary"
            size="small"
            InputProps={{ inputProps: { min: childrenList.filter(child => child.giftId === gift.id).length} }}
            // error={countError}
            onChange={(e) => updateForm('count', e.target.value)}
          />
        </td>
        <td className='giftsRow__count'>{childrenList.filter(child => child.giftId === gift.id).length}</td>
        <td>
          <Button type='submit' onClick={() => {setEditedGift(form)}} variant="outlined">
            Save
          </Button>
        </td>
        <td>
          <Button
            onClick={() => {
              setEditableGiftElement('');
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </td>
      </tr>
    </>
  );
};
