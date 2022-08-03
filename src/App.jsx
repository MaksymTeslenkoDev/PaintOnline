import React from 'react';
import "styles/app.scss";
import {SettingBar} from "components/SettingBar"
import { Toolbar } from 'components/Toolbar';
import { Canvas } from 'components/Canvas';

export const App = ()=>{
    return(
        <div className='app'>
            <SettingBar/>
            <Toolbar/>
            <Canvas/>
        </div>
    )
}