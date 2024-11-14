import { useEffect, useRef } from 'react';
import './CanvasPage.scss';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

const CanvasPage = observer( () => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
    toolState.setTool(new Rect(canvasRef.current));
    toolState.setTool(new Circle(canvasRef.current));
    toolState.setTool(new Eraser(canvasRef.current));
    toolState.setTool(new Line(canvasRef.current));
  },[])

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef?.current.toDataURL());
  }

  return (
    <div className="canvas">
      <canvas 
          onMouseDown={()=> mouseDownHandler()}
          ref={canvasRef}  
          width={1000} 
          height={450}/>
    </div>
  );
})

export default CanvasPage;
