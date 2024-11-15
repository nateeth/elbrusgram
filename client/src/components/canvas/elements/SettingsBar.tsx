import './ToolBar.scss';
import './Canvas.scss';
import { Input } from '@mui/material';
import toolState from '../store/toolState';

function SettingsBar(): JSX.Element {
  return (
    <div className="setting-bar" style={{ top: 140 }}>
      <label htmlFor="line-width">Толщина линии</label>
      <Input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ margin: '0 10px' }}
        id="line-width"
        type="number"
        defaultValue={1}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <Input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        className="toolbar-button"
        style={{ margin: '0 10px' }}
        id="stroke-color"
        type="color"
      />
    </div>
  );
}

export default SettingsBar;
