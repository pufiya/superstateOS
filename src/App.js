import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BootScreen from './components/BootScreen/BootScreen';
import Manifesto from './components/Manifesto/Manifesto';
import Quiz from './components/Quiz/Quiz';
import JoinSuccess from './components/JoinSuccess/JoinSuccess';
import LiveStream from './components/LiveStream/LiveStream';
import TokenInfo from './components/TokenInfo/TokenInfo';
import MatrixRain from './components/MatrixRain/MatrixRain';

function App() {
  return (
    <Router>
      <div className="app-container">
        <MatrixRain />
        <div className="content-layer">
          <Routes>
            <Route path="/" element={<BootScreen />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/join-success" element={<JoinSuccess />} />
            <Route path="/live-stream" element={<LiveStream />} />
            <Route path="/token-info" element={<TokenInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;