const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importar rotas
const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');
const healthRoutes = require('./routes/health');

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas da API
app.use('/api/health', healthRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/clientes', clientesRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Star Colchões API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      produtos: '/api/produtos',
      clientes: '/api/clientes'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
