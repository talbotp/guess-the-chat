import React from 'react';
import Container from 'react-bootstrap/Container';
import { TwitchEmbed } from 'react-twitch-embed';
import '../styles/App.css';
import '../styles/Game.css';

export default class Win extends React.Component {

  render() {
    const { username } = this.props.match.params
    return (
      <Container fluid="sm" className="justify-content-md-center">
        <h1 className="App-Title">Correct!</h1>
        <p className="App-Subtitle">
          Check out their stream below!
        </p>
        <div className="Center-Content">
          <TwitchEmbed
            channel={username}
            id={username}
            theme="dark"
            muted
          />
        </div>
      </Container>
    );
  }

}
