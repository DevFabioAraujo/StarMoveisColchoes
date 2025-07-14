const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET - Listar todos os clientes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM clientes ORDER BY created_at DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    res.json(rows);
  });
});

// GET - Buscar cliente por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM clientes WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ 
        error: 'Cliente não encontrado' 
      });
    }
    
    res.json(row);
  });
});

// POST - Criar novo cliente
router.post('/', (req, res) => {
  const { nome, email, telefone, endereco, cidade, cep } = req.body;
  
  // Validação básica
  if (!nome || !email || !telefone) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: nome, email, telefone' 
    });
  }
  
  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Email inválido' 
    });
  }
  
  const sql = `
    INSERT INTO clientes (nome, email, telefone, endereco, cidade, cep)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [nome, email, telefone, endereco, cidade, cep], function(err) {
    if (err) {
      console.error('Erro ao criar cliente:', err.message);
      
      // Verificar se é erro de email duplicado
      if (err.message.includes('UNIQUE constraint failed: clientes.email')) {
        return res.status(400).json({ 
          error: 'Este email já está cadastrado' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    // Buscar o cliente criado
    db.get('SELECT * FROM clientes WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error('Erro ao buscar cliente criado:', err.message);
        return res.status(500).json({ 
          error: 'Cliente criado mas erro ao retornar dados' 
        });
      }
      
      res.status(201).json({
        message: 'Cliente criado com sucesso',
        cliente: row
      });
    });
  });
});

// PUT - Atualizar cliente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco, cidade, cep } = req.body;
  
  // Validação básica
  if (!nome || !email || !telefone) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: nome, email, telefone' 
    });
  }
  
  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Email inválido' 
    });
  }
  
  const sql = `
    UPDATE clientes 
    SET nome = ?, email = ?, telefone = ?, endereco = ?, cidade = ?, cep = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  db.run(sql, [nome, email, telefone, endereco, cidade, cep, id], function(err) {
    if (err) {
      console.error('Erro ao atualizar cliente:', err.message);
      
      // Verificar se é erro de email duplicado
      if (err.message.includes('UNIQUE constraint failed: clientes.email')) {
        return res.status(400).json({ 
          error: 'Este email já está cadastrado por outro cliente' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Cliente não encontrado' 
      });
    }
    
    // Buscar o cliente atualizado
    db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Erro ao buscar cliente atualizado:', err.message);
        return res.status(500).json({ 
          error: 'Cliente atualizado mas erro ao retornar dados' 
        });
      }
      
      res.json({
        message: 'Cliente atualizado com sucesso',
        cliente: row
      });
    });
  });
});

// DELETE - Excluir cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Erro ao excluir cliente:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Cliente não encontrado' 
      });
    }
    
    res.json({
      message: 'Cliente excluído com sucesso',
      id: parseInt(id)
    });
  });
});

// GET - Buscar clientes por nome
router.get('/buscar/:nome', (req, res) => {
  const { nome } = req.params;
  const sql = 'SELECT * FROM clientes WHERE nome LIKE ? ORDER BY created_at DESC';
  
  db.all(sql, [`%${nome}%`], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar clientes por nome:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    res.json(rows);
  });
});

module.exports = router;
