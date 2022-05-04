import React from 'react';
import {ChildEntity} from 'types';
import {ChildrenTableRow} from './ChildrenTableRow';

interface Props {
    children: ChildEntity[];
    onChildrenChange: () => void;
}

export const ChildrenTable = (props: Props) => (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
            props.children.map((child) => <ChildrenTableRow key={child.id} onChildrenChange={props.onChildrenChange} child={child}/>)
        }
        </tbody>
    </table>
)
