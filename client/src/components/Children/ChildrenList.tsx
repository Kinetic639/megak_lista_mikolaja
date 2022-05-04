import React, {useEffect, useState} from 'react';
import {ChildEntity} from 'types'
import {Spinner} from "../comon/Spinner/Spinner";
import {ChildrenTable} from "./ChildrenTable";

export const ChildrenList = () => {
    const [childrenList, setGiftsList] = useState<ChildEntity[] | null>(null)

    const refreshChildren = async () => {
        setGiftsList(null)
        const res = await fetch('http://localhost:3001/children')
        const data = await res.json()
        setGiftsList(data.childrenList)
    }

    useEffect(() => {
        refreshChildren()
    }, [])

    if (childrenList === null) {
        return <Spinner/>
    }
    return <>
        <h1>Children:</h1>
        <ChildrenTable children={childrenList}
                    onChildrenChange={refreshChildren}/>
    </>
}
