import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Configuracao extends PureComponent {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configuração</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

Configuracao.propTypes = {

};

export default Configuracao;
