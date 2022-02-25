import React, { Component } from 'react';
import Header from '../components/Header';

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found" />
      </>
    );
  }
}
