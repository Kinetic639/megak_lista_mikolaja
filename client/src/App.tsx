import React from 'react';
import './App.css';
import {GiftsView} from "./views/GiftsView/GiftsView";
import {Routes, Route, useLocation} from 'react-router-dom'
import {TestView} from './views/TestView/TestView';
import {Layout} from "./views/Layout/Layout/Layout";
import {NotFoundView} from "./views/NotFoundView/NotFoundView";
import {SingleGiftView} from "./views/SingleGiftView/SingleGiftView";
import {ChildrenView} from "./views/ChildrenView/ChildrenView";
export const App = () => {
    const location = useLocation()
    console.log(process.env)
    return (
        <Layout key={location.key}>
            <Routes>
                <Route path="/children" element={<ChildrenView/>}/>
                <Route path="/gifts" element={<GiftsView/>}/>
                <Route path="/gifts/:giftId" element={<SingleGiftView/>}/>
                <Route path="/test" element={<TestView/>}/>
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </Layout>
    );
}

