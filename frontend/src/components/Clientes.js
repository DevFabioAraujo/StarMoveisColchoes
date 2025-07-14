import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      setClientes(response.data);
      setError('');
    } catch (error) {
      setError('Erro ao carregar clientes. Verifique se o backend está rodando.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/clientes`, formData);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        cep: ''
      });
      setShowForm(false);
      fetchClientes();
      setError('');
    } catch (error) {
      setError('Erro ao adicionar cliente.');
      console.error('Erro:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const deleteCliente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await axios.delete(`${API_URL}/clientes/${id}`);
        fetchClientes();
        setError('');
      } catch (error) {
        setError('Erro ao excluir cliente.');
        console.error('Erro:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando clientes...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">Gestão de Clientes</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Novo Cliente'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Adicionar Novo Cliente</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Nome Completo:</label>
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
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Telefone:</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div>
                <label>CEP:</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Endereço:</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Cidade:</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Adicionar Cliente
            </button>
          </form>
        </div>
      )}

      <div className="clientes-list">
        {clientes.length === 0 ? (
          <div className="card">
            <p>Nenhum cliente cadastrado ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {clientes.map((cliente) => (
              <div key={cliente.id} className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                  <div>
                    <h3>{cliente.nome}</h3>
                    <p><strong>Email:</strong> {cliente.email}</p>
                    <p><strong>Telefone:</strong> {cliente.telefone}</p>
                    {cliente.endereco && <p><strong>Endereço:</strong> {cliente.endereco}</p>}
                    {cliente.cidade && <p><strong>Cidade:</strong> {cliente.cidade}</p>}
                    {cliente.cep && <p><strong>CEP:</strong> {cliente.cep}</p>}
                  </div>
                  <div>
                    <button 
                      className="btn"
                      style={{ backgroundColor: '#dc3545', color: 'white' }}
                      onClick={() => deleteCliente(cliente.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Clientes;
