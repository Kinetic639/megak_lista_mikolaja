import React, { FormEvent, useState } from 'react';
import {ChildEntity, GiftEntity, UpdateChildReq} from 'types';
import {ChildrenReadOnlyTableRow} from './ChildrenReadOnlyTableRow';
import { useAppDispatch } from "../../app/hooks";
import { ChildrenInlineEditTableRow } from './ChildrenInlineEditTableRow';
import { updateChildName } from '../../redux/features/children-slice';

interface Props {
    childrenList: ChildEntity[];
    giftsList: GiftEntity[];
}

export const ChildrenTable = ({childrenList, giftsList}: Props) => {
    const dispatch = useAppDispatch()
    const [editableChildElement, setEditableChildElement] = useState<string | undefined>('')
    const [editedChild, setEditedChild] = useState<UpdateChildReq>({
        id: editableChildElement,
        name: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        
        dispatch(updateChildName(editedChild))
        
    }

   return (
    <form onSubmit={handleSubmit}>
    <table>
         <thead>
         <tr>
             <th>Name</th>
             <th>Gift</th>
             <th>Action</th>
         </tr>
         </thead>
         <tbody>
         {
             childrenList.map((child) =>
             editableChildElement === child.id ?
             <ChildrenInlineEditTableRow key={child.id}  giftsList={giftsList} child={child} setEditedChild={setEditedChild} setEditableChildElement={setEditableChildElement} />
             :  
             <ChildrenReadOnlyTableRow key={child.id} giftsList={giftsList} child={child} setEditableChildElement={setEditableChildElement} />
             
             )
         }
         </tbody>
     </table>
     </form>
   )
 
    }
