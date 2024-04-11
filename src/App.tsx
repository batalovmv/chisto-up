
import './App.scss'
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import useAuthToken from './hooks/useAuthToken';
function App() {
  useAuthToken();
  return (
    <>
          <HashRouter>
              <div className="App">
             
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Другие маршруты */}
              </Routes>
              </div>
          </HashRouter>
    </>
  )
}

export default App
