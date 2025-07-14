import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    estoque: ''
  });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`${API_URL}/produtos`);
      setProdutos(response.data);
      setError('');
    } catch (error) {
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/produtos`, formData);
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
        categoria: '',
        estoque: ''
      });
      setShowForm(false);
      fetchProdutos();
      setError('');
    } catch (error) {
      setError('Erro ao adicionar produto.');
      console.error('Erro:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const deleteProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`${API_URL}/produtos/${id}`);
        fetchProdutos();
        setError('');
      } catch (error) {
        setError('Erro ao excluir produto.');
        console.error('Erro:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">Gestão de Produtos</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Adicionar Novo Produto</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div>
                <label>Categoria:</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casal">Casal</option>
                  <option value="Queen">Queen</option>
                  <option value="King">King</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Descrição:</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Preço (R$):</label>
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  step="0.01"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div>
                <label>Estoque:</label>
                <input
                  type="number"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Adicionar Produto
            </button>
          </form>
        </div>
      )}

      <div className="produtos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {produtos.length === 0 ? (
          <div className="card">
            <p>Nenhum produto cadastrado ainda.</p>
          </div>
        ) : (
          produtos.map((produto) => (
            <div key={produto.id} className="card">
              <h3>{produto.nome}</h3>
              <p><strong>Categoria:</strong> {produto.categoria}</p>
              <p><strong>Descrição:</strong> {produto.descricao}</p>
              <p><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</p>
              <p><strong>Estoque:</strong> {produto.estoque} unidades</p>
              <div style={{ marginTop: '1rem' }}>
                <button 
                  className="btn"
                  style={{ backgroundColor: '#dc3545', color: 'white', marginRight: '10px' }}
                  onClick={() => deleteProduto(produto.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Produtos;
