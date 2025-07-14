import React from 'react';

function Home() {
  return (
    <div>
      <div className="welcome-section">
        <h2>Bem-vindo ao Sistema Star Colchões</h2>
        <p>
          Sistema completo de gestão para sua loja de colchões. 
          Gerencie produtos, clientes e vendas de forma simples e eficiente.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Gestão de Produtos</h3>
          <p>
            Cadastre e gerencie todos os seus produtos de forma organizada. 
            Controle estoque, preços e características dos colchões.
          </p>
        </div>

        <div className="feature-card">
          <h3>Cadastro de Clientes</h3>
          <p>
            Mantenha um registro completo dos seus clientes com informações 
            de contato e histórico de compras.
          </p>
        </div>

        <div className="feature-card">
          <h3>Relatórios</h3>
          <p>
            Acompanhe o desempenho das vendas com relatórios detalhados 
            e análises de performance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
