import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './styles/profile.css';
import userImg from '../images/user-solid.svg';

export default class Profile extends Component {
  state = {
    loading: false,
    user: {},
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ loading: false, user: userObj });
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, email, description } = user;
    const icon = <img className="user-icon big" src={ userImg } alt="user" />;
    const imgTag = (
      <img data-testid="profile-image" className="big" src={ image } alt="profile" />
    );
    const profile = (
      <div className="profile-card">
        <div className="img-container">
          {image ? imgTag : icon}
          <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
        </div>
        <h4>Nome</h4>
        <p>{name}</p>
        <h4>E-mail</h4>
        <p>{email}</p>
        <h4>Descrição</h4>
        <p>{description}</p>
      </div>
    );
    return (
      <>
        <Header />
        <div className="profile-container" data-testid="page-profile">
          {loading ? <Loading /> : profile }
        </div>
      </>
    );
  }
}
