import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import trybeTunesImg from '../images/trybetunesblack.png';
import './styles/login.css';

export default class Login extends Component {
  state = {
    nameInput: '',
    btnDisabled: true,
    loading: false,
    finish: false,
  }

  verifyBtn = () => {
    const { nameInput } = this.state;
    if (nameInput.length > 2) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyBtn);
  }

  redirecting = () => {
    const { finish } = this.state;
    if (finish) {
      return <Redirect to="/search" />;
    }
  }

  btnClick = (event) => {
    event.preventDefault();
    const { nameInput } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name: nameInput })
        .then(() => (
          this.setState({
            loading: false,
            finish: true,
          })
        ));
    });
  }

  render() {
    const { nameInput, btnDisabled, loading } = this.state;
    return (
      <div className="login-container" data-testid="page-login">
        <img src={ trybeTunesImg } alt="trybe Tunes Logo" />
        <form className="login-form">

          <label htmlFor="name-input">
            <input
              data-testid="login-name-input"
              id="name-input"
              onChange={ this.handleChange }
              value={ nameInput }
              name="nameInput"
              placeholder="Nome"
            />
          </label>
          <button
            type="submit"
            onClick={ this.btnClick }
            disabled={ btnDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          {loading ? <Loading /> : this.redirecting() }
        </form>
      </div>
    );
  }
}
