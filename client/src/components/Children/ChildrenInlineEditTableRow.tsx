import React, { Dispatch, SetStateAction, useState } from 'react';
import { ChildEntity, GiftEntity } from 'types';
import Button from '@mui/material/Button';
import { ChildGiftSelect } from '../ChildGiftSelect/ChildGiftSelect';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface Props {
  child: ChildEntity;
  giftsList: GiftEntity[];
  setEditableChildElement: Dispatch<SetStateAction<string | undefined>>;
  setEditedChild: Dispatch<SetStateAction<ChildEntity>>;
}

export const ChildrenInlineEditTableRow = ({
  child,
  giftsList,
  setEditableChildElement,
  setEditedChild,
}: Props) => {
  const [form, setForm] = useState<ChildEntity>({
    id: child.id,
    name: child.name,
    giftId: child.giftId,
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
              label="Edit Child"
              variant="outlined"
              color="primary"
              size="small"
              required
              // error={nameError}
              InputProps={{ inputProps: { minLength: 3, maxLength: 55}}}
              onChange={(e) => updateForm('name', e.target.value)}
            />
          </FormControl>
        </td>
        <td>
          <ChildGiftSelect
            childId={child.id as string}
            selectedId={child.giftId}
          />
        </td>
        <td>
          <Button
            type="submit"
            onClick={() => {
              setEditedChild(form);         
            }}
            variant="outlined"
          >
            Save
          </Button>
        </td>
        <td>
        <Button
            onClick={() => {
              setEditableChildElement('');
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
