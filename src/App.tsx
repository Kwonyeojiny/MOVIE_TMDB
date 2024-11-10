import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoveiDetail from './pages/MoviDetail';
import MovieList from './pages/MovieList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MoveiDetail />} />
      </Routes>
    </>
  );
}

export default App;
