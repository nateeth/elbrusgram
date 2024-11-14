import './ToolBar.scss';
import './CanvasPage.scss';
import { Button, Input } from '@mui/material';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';


function ToolBar(): JSX.Element {
  const changeColor = (e) => {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);

  }

  return (
    <div className="toolbar" style={{ top: 60 }}>
      <Button
        className="toolbar-button brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></Button>
      <Button
        className="toolbar-button rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      ></Button>
      <Button
        className="toolbar-button circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></Button>
      <Button
        className="toolbar-button eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      ></Button>
      <Button
        className="toolbar-button line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></Button>
      <Input
        onChange={(e) => changeColor(e)}
        style={{ marginLeft: 10 }}
        type="color"
        className="toolbar-button"
      ></Input>
      <Button className="toolbar-button undo" onClick={() => canvasState.undo()}></Button>
      <Button className="toolbar-button redo" onClick={() => canvasState.redo()}></Button>
      <Button className="toolbar-button save"></Button>
    </div>
  );
}

export default ToolBar;
 