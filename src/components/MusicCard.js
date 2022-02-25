import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './styles/musicCard.css';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
    checkStyle: { color: 'black' },
    favorites: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favorites: response, loading: false }, this.verifyfavorite);
  };

  favoritingSong = async () => {
    const { musicObj } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      const response = await removeSong(musicObj);
      this.setState({ checked: false, loading: false, checkStyle: { color: 'black' } });
      return (response);
    }
    const response = await addSong(musicObj);
    this.setState({ checked: true, loading: false, checkStyle: { color: 'red' } });
    return (response);
  };

  verifyfavorite = () => {
    const { favorites } = this.state;
    const { musicObj: { trackId } } = this.props;
    const itFound = favorites.some((music) => music.trackId === trackId);
    if (itFound) {
      return this.setState({ checked: true, checkStyle: { color: 'red' } });
    }
  };

  render() {
    const { musicObj } = this.props;
    const { trackId, trackName, previewUrl, artworkUrl100 } = musicObj;
    const { loading, checked, favorites, checkStyle } = this.state;
    const input = (
      <label className="custom-checkbox" htmlFor={ trackId }>
        <i className="fas fa-heart" style={ checkStyle } checked={ checked } />
        <input
          id={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          name="favorite"
          checked={ checked }
          onChange={ this.favoritingSong }
        />
      </label>
    );
    const card = (
      <div className="player-card">
        <img className="player-album-img" src={ artworkUrl100 } alt={ trackId } />
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
        {input}
      </div>
    );

    return (
      <>
        {loading ? <Loading /> : card}
        {favorites && null}
      </>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
