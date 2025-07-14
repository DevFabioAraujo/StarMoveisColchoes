# Star Colchões - Sistema de Gestão

Sistema completo de gestão para loja de colchões desenvolvido com React (frontend) e Node.js/Express (backend).

## 🚀 Funcionalidades

- **Gestão de Produtos**: Cadastro, listagem, edição e exclusão de colchões
- **Gestão de Clientes**: Cadastro completo de clientes com informações de contato
- **Interface Responsiva**: Design moderno e responsivo
- **API RESTful**: Backend robusto com SQLite
- **Dados de Exemplo**: Sistema já vem com dados pré-cadastrados para teste

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Instalar dependências do Backend

```bash
cd backend
npm install
```

### 2. Instalar dependências do Frontend

```bash
cd frontend
npm install
```

### 3. Executar o Backend

```bash
cd backend
npm run dev
```

O backend será executado em: `http://localhost:5001`

### 4. Executar o Frontend (em outro terminal)

```bash
cd frontend
npm start
```

O frontend será executado em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
starcolchoes/
├── backend/
│   ├── database/
│   │   └── db.js              # Configuração do banco SQLite
│   ├── routes/
│   │   ├── health.js          # Rota de health check
│   │   ├── produtos.js        # Rotas de produtos
│   │   └── clientes.js        # Rotas de clientes
│   ├── .env                   # Variáveis de ambiente
│   ├── package.json
│   └── server.js              # Servidor principal
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js        # Página inicial
│   │   │   ├── Produtos.js    # Gestão de produtos
│   │   │   └── Clientes.js    # Gestão de clientes
│   │   ├── App.js             # Componente principal
│   │   ├── App.css            # Estilos principais
│   │   ├── index.js           # Ponto de entrada
│   │   └── index.css          # Estilos globais
│   └── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **SQLite3**: Banco de dados
- **CORS**: Middleware para requisições cross-origin
- **dotenv**: Gerenciamento de variáveis de ambiente

### Frontend
- **React**: Biblioteca para interface de usuário
- **React Router**: Roteamento
- **Axios**: Cliente HTTP para requisições à API
- **CSS3**: Estilização responsiva

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Verificar status da API

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/:id` - Buscar produto por ID
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Excluir produto
- `GET /api/produtos/categoria/:categoria` - Buscar por categoria

### Clientes
- `GET /api/clientes` - Listar todos os clientes
- `GET /api/clientes/:id` - Buscar cliente por ID
- `POST /api/clientes` - Criar novo cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Excluir cliente
- `GET /api/clientes/buscar/:nome` - Buscar por nome

## 🎯 Como Usar

1. **Acesse o sistema**: Abra `http://localhost:3000` no navegador
2. **Navegue pelas seções**: Use o menu superior para acessar Home, Produtos e Clientes
3. **Gerencie produtos**: Adicione, visualize e exclua produtos de colchões
4. **Cadastre clientes**: Mantenha um registro completo dos seus clientes
5. **Monitore a conexão**: O indicador no canto superior direito mostra o status da conexão com o backend

## 🔍 Dados de Exemplo

O sistema já vem com alguns dados pré-cadastrados:

### Produtos
- Colchão Ortopédico Solteiro
- Colchão Memory Foam Casal
- Colchão Premium Queen

### Clientes
- João Silva
- Maria Santos

## 🚨 Solução de Problemas

### Backend não conecta
- Verifique se a porta 5000 está disponível
- Confirme se todas as dependências foram instaladas
- Verifique os logs do console para erros específicos

### Frontend não carrega dados
- Confirme se o backend está rodando
- Verifique o indicador de conexão no canto superior direito
- Abra o console do navegador para verificar erros de rede

### Erro de CORS
- Verifique se o arquivo `.env` está configurado corretamente
- Confirme se o frontend está rodando na porta 3000

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 👥 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Star Colchões** - Sistema de Gestão © 2024
