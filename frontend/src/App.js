import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import Produtos from './components/Produtos';
import Clientes from './components/Clientes';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Testar conexão com o backend
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API_URL}/health`);
        if (response.status === 200) {
          setIsConnected(true);
        }
      } catch (error) {
        console.log('Backend não conectado:', error.message);
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="container">
              <Link to="/" className="logo">
                <h1>Star Colchões</h1>
              </Link>
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/produtos">Produtos</Link></li>
                <li><Link to="/clientes">Clientes</Link></li>
              </ul>
              <div className="connection-status">
                <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                  {isConnected ? '● Conectado' : '● Desconectado'}
                </span>
              </div>
            </div>
          </nav>
        </header>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/clientes" element={<Clientes />} />
            </Routes>
          </div>
        </main>

        <footer className="App-footer">
          <div className="container">
            <p>&copy; 2024 Star Colchões. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
