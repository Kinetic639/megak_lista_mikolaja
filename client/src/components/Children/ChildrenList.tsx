import React, {useEffect} from 'react';
import {Spinner} from "../comon/Spinner/Spinner";
import {ChildrenTable} from "./ChildrenTable";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {getChildrenAsync} from "../../redux/features/children-slice";

export const ChildrenList = () => {
    const dispatch = useAppDispatch()
    const children = useAppSelector((state: RootState) => state.children)


    useEffect(() => {
        dispatch(getChildrenAsync())
    }, [dispatch])

    if (children.status === 'loading') {
        return <Spinner/>
    }
    return <>
        <h1>Children:</h1>
        {<ChildrenTable childrenList={children.children.childrenList} giftsList={children.children.giftsList}/>}
    </>
}
