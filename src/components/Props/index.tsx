import PropTypes from 'prop-types';

function BemVindo({nome = "João Ninguém", idade = 0}: { nome: string, idade: number }) {
  return (
    <>
      <h1>Olá, {nome} ({idade} anos)!</h1>
      <p>Bem-vindo ao nosso site.</p>
    </>
  );
}

// Definições inúteis
BemVindo.propTypes = {
    nome: PropTypes.string.isRequired,
    idade: PropTypes.number.isRequired,
}

BemVindo.defaultProps = {
    nome: "João Ninguém",
    idade: 0,
};

export default BemVindo;