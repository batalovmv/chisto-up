
import './App.scss'
import Header from './components/Header/Header'
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import useAuthToken from './hooks/useAuthToken';
function App() {
  useAuthToken();
  return (// просто добавил их для будущего, они полюбому будут нужны в приложении ,хотя в данном задании с одной страницей это излишне
    <>
          <HashRouter>
              <div className="App">
              <Header />
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
