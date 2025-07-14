const express = require('express');
const router = express.Router();

// Rota de health check
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Star Colchões API está funcionando',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

module.exports = router;
