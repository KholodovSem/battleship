import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '@/utils/app-routes';
import { StartScreen } from '@/pages/start-screen/StartScreen';
import { Board } from './components/Board';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.START_SCREEN} element={<StartScreen />} />
        <Route path={AppRoutes.SINGLEPLAYER} element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
