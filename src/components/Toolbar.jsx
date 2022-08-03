import React from 'react';
import "styles/toolbar.scss";
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';

export const Toolbar=()=> {
  return(
    <div className='tool-bar'>
        <button className="tool-bar__btn brush" onClick={()=>toolState.setTool(new Brush(canvasState.canvas))}/>
        <button className="tool-bar__btn rect" onClick={()=>toolState.setTool(new Rect(canvasState.canvas))}/>
        <button className="tool-bar__btn circle"/>
        <button className="tool-bar__btn eraser"/>
        <button className="tool-bar__btn line"/>
        <input style={{marginLeft:10}} type="color"/>
        <button className="tool-bar__btn undo"/>
        <button className="tool-bar__btn redo"/>
        <button className="tool-bar__btn save"/>
    </div>
  )
}
