import React from "react";
import "./Dialog.scss";
import {Dialog} from "./Dialog";
interface Props {
    title?: String;
    children: React.ReactNode;
}

export const ConfirmDialog = ({children, title}: Props) => {
    return (
        <Dialog title={title}>
            {children}
            <hr/>
            <button>Yes</button>
            <button>No</button>
        </Dialog>
    );
};
