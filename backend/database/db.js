const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'database.sqlite');

// Criar conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite');
  }
});

// Criar tabelas se não existirem
const initDatabase = () => {
  // Tabela de produtos
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      categoria TEXT NOT NULL,
      estoque INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela produtos:', err.message);
    } else {
      console.log('✅ Tabela produtos criada/verificada');
    }
  });

  // Tabela de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT NOT NULL,
      endereco TEXT,
      cidade TEXT,
      cep TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela clientes:', err.message);
    } else {
      console.log('✅ Tabela clientes criada/verificada');
    }
  });

  // Inserir dados de exemplo se as tabelas estiverem vazias
  insertSampleData();
};

const insertSampleData = () => {
  // Verificar se já existem produtos
  db.get('SELECT COUNT(*) as count FROM produtos', (err, row) => {
    if (err) {
      console.error('Erro ao verificar produtos:', err.message);
      return;
    }
    
    if (row.count === 0) {
      const sampleProdutos = [
        {
          nome: 'Colchão Ortopédico Solteiro',
          descricao: 'Colchão ortopédico com molas ensacadas, ideal para quem busca conforto e suporte.',
          preco: 599.99,
          categoria: 'Solteiro',
          estoque: 15
        },
        {
          nome: 'Colchão Memory Foam Casal',
          descricao: 'Colchão com espuma viscoelástica que se adapta ao corpo.',
          preco: 1299.99,
          categoria: 'Casal',
          estoque: 8
        },
        {
          nome: 'Colchão Premium Queen',
          descricao: 'Colchão premium com tecnologia avançada de conforto.',
          preco: 1899.99,
          categoria: 'Queen',
          estoque: 5
        }
      ];

      sampleProdutos.forEach(produto => {
        db.run(`
          INSERT INTO produtos (nome, descricao, preco, categoria, estoque)
          VALUES (?, ?, ?, ?, ?)
        `, [produto.nome, produto.descricao, produto.preco, produto.categoria, produto.estoque]);
      });

      console.log('✅ Dados de exemplo inseridos na tabela produtos');
    }
  });

  // Verificar se já existem clientes
  db.get('SELECT COUNT(*) as count FROM clientes', (err, row) => {
    if (err) {
      console.error('Erro ao verificar clientes:', err.message);
      return;
    }
    
    if (row.count === 0) {
      const sampleClientes = [
        {
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          telefone: '(11) 99999-1234',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          cep: '01234-567'
        },
        {
          nome: 'Maria Santos',
          email: 'maria.santos@email.com',
          telefone: '(11) 88888-5678',
          endereco: 'Av. Principal, 456',
          cidade: 'São Paulo',
          cep: '01234-890'
        }
      ];

      sampleClientes.forEach(cliente => {
        db.run(`
          INSERT INTO clientes (nome, email, telefone, endereco, cidade, cep)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [cliente.nome, cliente.email, cliente.telefone, cliente.endereco, cliente.cidade, cliente.cep]);
      });

      console.log('✅ Dados de exemplo inseridos na tabela clientes');
    }
  });
};

// Inicializar banco de dados
initDatabase();

module.exports = db;
