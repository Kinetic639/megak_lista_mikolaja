import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGiftForChild } from '../../redux/features/children-slice';
import { RootState } from '../../app/store';
import { getSingleGiftAsync } from '../../redux/features/gifts-slice';

interface Props {
  selectedId: string;
  setSelectedGiftId?: Dispatch<SetStateAction<string >>;
  childId: string;
}

export const ChildGiftSelect = ({  childId, setSelectedGiftId, selectedId }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    selectedId || '',
  );
  const dispatch = useAppDispatch();
  const children = useAppSelector((state: RootState) => state.children.children)
  const childrenList = children.childrenList
  const giftsList = children.giftsList

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
    setSelectedGiftId?.(event.target.value)
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && childId ) {
        dispatch(setGiftForChild({childId: childId, giftId: selectedOption}))
      
    } else {
      isMounted.current = true;
    }
  }, [selectedOption, childId]);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
        <InputLabel id="select-small">Gift</InputLabel>
        <Select
          labelId="select-small"
          id="select-small"
          value={selectedOption}
          label="Gift"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {giftsList.map(
              (gift) => (    
              
               <MenuItem key={gift.id} value={gift.id} disabled={ childrenList.filter(child => child.giftId === gift.id).length >= gift.count }>
              {`${gift.name} (${childrenList.filter(child => child.giftId === gift.id).length} / ${gift.count})`}
              </MenuItem>
              )
          )
          }
        </Select>
      </FormControl>
    </>
  );
};
