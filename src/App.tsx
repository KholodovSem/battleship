import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '@/utils/app-routes';
import { StartScreen } from '@/pages/start-screen/StartScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.START_SCREEN} element={<StartScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
