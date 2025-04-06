import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';

import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
