import React, {useEffect, useState} from 'react';
import { ListChildrenRes} from 'types'
import {Spinner} from "../comon/Spinner/Spinner";
import {ChildrenTable} from "./ChildrenTable";

export const ChildrenList = () => {
    const [data, setData] = useState<ListChildrenRes | null>(null)
    const refreshChildren = async () => {
        setData(null)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/children`)
        const data = await res.json()
        setData(data)
    }

    useEffect(() => {
        refreshChildren()
    }, [])

    if (data === null) {
        return <Spinner/>
    }
    return <>
        <h1>Children:</h1>
        <ChildrenTable childrenList={data.childrenList} giftsList={data.giftsList}
                    onChildrenChange={refreshChildren}/>
    </>
}
