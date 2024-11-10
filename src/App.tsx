import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoveiDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MoveiDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
