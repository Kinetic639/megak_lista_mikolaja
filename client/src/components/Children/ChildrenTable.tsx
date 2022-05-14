import React from 'react';
import {ChildEntity, GiftEntity} from 'types';
import {ChildrenTableRow} from './ChildrenTableRow';

interface Props {
    childrenList: ChildEntity[];
    giftsList: GiftEntity[];
    onChildrenChange: () => void;
}

export const ChildrenTable = (props: Props) => (
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
            props.childrenList.map((child) => <ChildrenTableRow key={child.id} giftsList={props.giftsList} onChildrenChange={props.onChildrenChange} child={child}/>)
        }
        </tbody>
    </table>
)
