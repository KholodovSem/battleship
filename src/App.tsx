import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '@/utils';
import { StartScreen } from '@/pages/start-screen/StartScreen';
import { PreparetionScreen } from '@/pages/preparation/PreparetionScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.START_SCREEN} element={<StartScreen />} />
        <Route path={AppRoutes.SINGLEPLAYER} element={<PreparetionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
