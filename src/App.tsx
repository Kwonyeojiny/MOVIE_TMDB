import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoveiDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MoveiDetail />} />
      </Routes>
    </>
  );
}

export default App;
