import React from 'react';
import "styles/toolbar.scss";
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from 'tools/Brush';
import Circle from 'tools/Circle';
import Rect from 'tools/Rect';
import Eraser from 'tools/Eraser';
import Line from 'tools/Line';

export const Toolbar=()=> {
  const changeColor = e=>{
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }

  return(
    <div className='tool-bar'>
        <button className="tool-bar__btn brush" onClick={()=>toolState.setTool(new Brush(canvasState.canvas))}/>
        <button className="tool-bar__btn rect" onClick={()=>toolState.setTool(new Rect(canvasState.canvas))}/>
        <button className="tool-bar__btn circle" onClick={()=>toolState.setTool(new Circle(canvasState.canvas))}/>
        <button className="tool-bar__btn eraser" onClick={()=>toolState.setTool(new Eraser(canvasState.canvas))}/>
        <button className="tool-bar__btn line" onClick={()=>toolState.setTool(new Line(canvasState.canvas))}/>
        <input onChange={(e)=>changeColor(e)} style={{marginLeft:10}} type="color"/>
        <button className="tool-bar__btn undo" onClick={()=>canvasState.undo()}/>
        <button className="tool-bar__btn redo" onClick={()=>canvasState.redo()}/>
        <button className="tool-bar__btn save"/>
    </div>
  )
}
