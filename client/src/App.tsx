import React ,{useEffect} from 'react';
import './App.css';
import {GiftsView} from "./views/GiftsView/GiftsView";
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import {Layout} from "./views/Layout/Layout/Layout";
import {NotFoundView} from "./views/NotFoundView/NotFoundView";
import {ChildrenView} from "./views/ChildrenView/ChildrenView";
import {InformationView} from "./views/InformationView/InformationView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from './app/store';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {getGiftsAsync} from "./redux/features/gifts-slice";

// import {Redirect} from "react-router";

export const App = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const giftsList = useAppSelector((state: RootState) => state.gifts)
    useEffect(() => {
        if (giftsList.status === 'succeeded'||giftsList.status === 'idle' ) {
            dispatch(getGiftsAsync())
        }
    }, [dispatch])
    return (<>
        <ToastContainer 
position="bottom-left" autoClose={2000} limit={4} theme='colored'/>
        <Layout key={location.key}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/children" />} />
                    <Route path="/children" element={<ChildrenView/>}/>
                    <Route path="/gifts" element={<GiftsView/>}/>
                    <Route path="/information" element={<InformationView/>}/>
                    <Route path="*" element={<NotFoundView/>}/>
                </Routes>
        </Layout>
        </>
    );
}

