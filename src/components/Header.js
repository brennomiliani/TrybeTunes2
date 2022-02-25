import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './styles/header.css';
import trybeTunesImg from '../images/trybetunes.png';
import userImg from '../images/user-solid.svg';

export default class Header extends Component {
  state = {
    user: '',
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { image } = user;
    const icon = <img className="user-icon" src={ userImg } alt="user" />;
    const headerContent = (
      <>
        <div className="top-content">
          <img src={ trybeTunesImg } alt="Trybetunes Logo" />
          <div>
            {image ? <img src={ image } className="user-icon" alt="profile" /> : icon}
            {user.name ? <p data-testid="header-user-name">{user.name}</p> : <Loading />}
          </div>
        </div>
        <nav>
          <Link data-testid="link-to-search" to="/search">
            <div>Pesquisa</div>
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            <div>Favoritas</div>
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            <div>Perfil</div>
          </Link>
        </nav>
      </>
    );

    return (
      <header data-testid="header-component">
        {headerContent}
      </header>
    );
  }
}
