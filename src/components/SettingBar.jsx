import React from 'react'
import toolState from '../store/toolState'

export const SettingBar=()=> {
  return (
    <div className='setting-bar'>
      <label htmlFor="line-width">Толщина линии</label>
      <input 
        onChange={e=>toolState.setLineWidth(e.target.value)}
        style={{margin:'0 10px'}} 
        id="line-width" 
        type="number" 
        defaultValue={1} 
        min={1} 
        max={50}/>
      <label htmlFor="stroke-width">Цвет обводки</label>
      <input id="stroke-width" 
        onChange={e=>toolState.setStrokeColor(e.target.value)} 
        type="color" 
        style={{margin:'0 10px'}} />
    </div>
  )
}
