import CanvasPage from './CanvasPage';
import './CanvasPage.scss';
import SettingsBarPage from './SettingsBarPage';
import ToolBarPage from './ToolBarPage';

function PaintPage(): JSX.Element {
  return (
    <div className="appcanvas">
      <ToolBarPage />
      <SettingsBarPage />
      <CanvasPage />
    </div>
  );
}

export default PaintPage;
