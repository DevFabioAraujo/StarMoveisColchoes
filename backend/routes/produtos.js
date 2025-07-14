const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET - Listar todos os produtos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM produtos ORDER BY created_at DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    res.json(rows);
  });
});

// GET - Buscar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produtos WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar produto:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    res.json(row);
  });
});

// POST - Criar novo produto
router.post('/', (req, res) => {
  const { nome, descricao, preco, categoria, estoque } = req.body;
  
  // Validação básica
  if (!nome || !preco || !categoria || estoque === undefined) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: nome, preco, categoria, estoque' 
    });
  }
  
  const sql = `
    INSERT INTO produtos (nome, descricao, preco, categoria, estoque)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [nome, descricao, preco, categoria, estoque], function(err) {
    if (err) {
      console.error('Erro ao criar produto:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    // Buscar o produto criado
    db.get('SELECT * FROM produtos WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error('Erro ao buscar produto criado:', err.message);
        return res.status(500).json({ 
          error: 'Produto criado mas erro ao retornar dados' 
        });
      }
      
      res.status(201).json({
        message: 'Produto criado com sucesso',
        produto: row
      });
    });
  });
});

// PUT - Atualizar produto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria, estoque } = req.body;
  
  // Validação básica
  if (!nome || !preco || !categoria || estoque === undefined) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: nome, preco, categoria, estoque' 
    });
  }
  
  const sql = `
    UPDATE produtos 
    SET nome = ?, descricao = ?, preco = ?, categoria = ?, estoque = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  db.run(sql, [nome, descricao, preco, categoria, estoque, id], function(err) {
    if (err) {
      console.error('Erro ao atualizar produto:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    // Buscar o produto atualizado
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Erro ao buscar produto atualizado:', err.message);
        return res.status(500).json({ 
          error: 'Produto atualizado mas erro ao retornar dados' 
        });
      }
      
      res.json({
        message: 'Produto atualizado com sucesso',
        produto: row
      });
    });
  });
});

// DELETE - Excluir produto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Erro ao excluir produto:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    res.json({
      message: 'Produto excluído com sucesso',
      id: parseInt(id)
    });
  });
});

// GET - Buscar produtos por categoria
router.get('/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  const sql = 'SELECT * FROM produtos WHERE categoria = ? ORDER BY created_at DESC';
  
  db.all(sql, [categoria], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos por categoria:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
      });
    }
    res.json(rows);
  });
});

module.exports = router;
