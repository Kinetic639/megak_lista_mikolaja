import React from "react";
import "./Dialog.scss";

interface Props {
    title?: String;
    children: React.ReactNode;
}

export const Dialog = (props: Props) => {
    return (
        <div className="Dialog__container">
            {props.title && <div className='Dialog__title'>{props.title}</div>}
            <div className="Dialog__content">
                {props.children}
            </div>
        </div>
    );
};
