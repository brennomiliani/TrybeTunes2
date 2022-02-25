import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './styles/favorites.css';

export default class Favorites extends Component {
  state = {
    loading: false,
    favorites: [],
  }

componentDidMount = async () => {
  this.setState({ loading: true });
  const response = await getFavoriteSongs();
  this.setState({ favorites: response, loading: false });
}

renderPlayers = () => {
  const { favorites } = this.state;
  const newArray = favorites.map((song) => (
    <MusicCard key={ song.trackId } musicObj={ song } />
  ));
  return newArray;
}

render() {
  const { loading, favorites } = this.state;
  const didntFavorite = (
    !loading && <h2>Você ainda não tem musicas favoritas</h2>
  );
  return (
    <>
      <Header />
      <div data-testid="page-favorites" className="favorites-container">
        {favorites.length < 1 && didntFavorite}
        {loading ? <Loading /> : this.renderPlayers()}
      </div>
    </>
  );
}
}
