import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    searchInput: '',
    btnDisabled: true,
    loading: false,
    albums: [],
    searched: false,
    prevSearch: '',
  };

  verifyBtn = () => {
    const { searchInput } = this.state;
    if (searchInput.length > 1) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value }, this.verifyBtn);
  }

  btnClcick = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(searchInput);
    this.setState({
      prevSearch: searchInput,
      searchInput: '',
      loading: false,
      albums: result,
      searched: true });
  }

  renderAlbums = () => {
    // mostrar imagem, nome do album e nome do artista
    const { albums } = this.state;
    // const { artistName, collectionId, collectionName, artworkUrl100 } = albums;

    return (
      albums.map((album) => (

        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `album/${album.collectionId}` }
          key={ album.collectionId }
        >
          <div id="album-card" className="album-card">
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <div className="card-text">
              <p className="album-title">{album.collectionName}</p>
              <p className="album-artist">{album.artistName}</p>
            </div>

          </div>
        </Link>
      ))
    );
  };

  render() {
    const {
      searchInput,
      btnDisabled,
      albums,
      loading,
      searched,
      prevSearch } = this.state;
    const notFound = <h2>Nenhum álbum foi encontrado</h2>;
    const found = <h2>{`Resultado de álbuns de: ${prevSearch}`}</h2>;
    const albumList = (
      <>
        { (albums.length < 1 && searched) && notFound }
        { albums.length > 0 && found }
        <div className="album-container">
          { albums.length > 0 && this.renderAlbums() }
        </div>
      </>
    );

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form className="search-form">
            <input
              type="text"
              value={ searchInput }
              data-testid="search-artist-input"
              name="searchInput"
              onChange={ this.handleChange }
              placeholder="Nome da banda ou artista"
            />
            <button
              disabled={ btnDisabled }
              onClick={ this.btnClcick }
              data-testid="search-artist-button"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
          {loading ? <Loading /> : albumList}
        </div>
      </>
    );
  }
}
