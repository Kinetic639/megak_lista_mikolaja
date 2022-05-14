import React from 'react';
import './App.css';
import {GiftsView} from "./views/GiftsView/GiftsView";
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import {TestView} from './views/TestView/TestView';
import {Layout} from "./views/Layout/Layout/Layout";
import {NotFoundView} from "./views/NotFoundView/NotFoundView";
import {SingleGiftView} from "./views/SingleGiftView/SingleGiftView";
import {ChildrenView} from "./views/ChildrenView/ChildrenView";
// import {Redirect} from "react-router";

export const App = () => {
    const location = useLocation()
    return (
        <Layout key={location.key}>
            <Routes>
                <Route path="/" element={<Navigate replace to="/children" />} />
                <Route path="/children" element={<ChildrenView/>}/>
                <Route path="/gifts" element={<GiftsView/>}/>
                <Route path="/gifts/:giftId" element={<SingleGiftView/>}/>
                <Route path="/test" element={<TestView/>}/>
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </Layout>
    );
}

