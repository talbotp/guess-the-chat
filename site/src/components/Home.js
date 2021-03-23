import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Game from './Game';
import '../styles/App.css';

const DEFAULT_NUMBER_OF_STREAMS = 20;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inPlay: false,
      numberOfStreams: DEFAULT_NUMBER_OF_STREAMS,
    }
  }

  render() {
    return (
        <div id="content">
          <Container fluid="sm" className="justify-content-md-center">
            <h1 className="App-Title">Can You Guess The Chat?</h1>
            <p className="App-Subtitle">
              Can you tell who the streamer is, just by looking at their chat?
            </p>
            {this.state.inPlay ? <Game endGame={this.endGame} /> : this.playGame()}
          </Container>
        </div>
    );
  }

  playGame() {
    return (
      <>
        {/* <p className="App-Text">
            Choose from the top
            <InputGroup>
              <FormControl
                placeholder={DEFAULT_NUMBER_OF_STREAMS}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={this.handleChange} 
              />
            </InputGroup>
            streamers by viewership.
          </p> */}
        <Container>
          <Row>
            <Col className="text-center">
              <Button variant="primary" size="lg" onClick={this.startGame}>
                Play
              </Button>{' '}
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  startGame = () => this.setState({ inPlay: true });

  endGame = () => this.setState({ inPlay: false });

}
