import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { BsX } from 'react-icons/bs';
import config from '../config';
import '../styles/Game.css';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stream: undefined,
      guess: '',
      results: [],
    };
  }

  render() {
    const streamUsername = this.state?.stream?.user_name;
    const chatSrc = `https://www.twitch.tv/embed/${streamUsername}/chat?parent=www.guessthechat.com`;
    return (
      <Container className>
        {this.state.stream === undefined
          ?
          <div className="Center-Content">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
          :
          <>
            <div className="Center-Content Twitch-Chat">
              <iframe
                src={chatSrc}
                title="Twitch-Chat-Title"
                height="500"
                width="400">
              </iframe>
            </div>
            <div className="Center-Content">
            <div className="pt-3 col-sm-4">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Guess their name here... PepeLaugh"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
            </div>
            <div className="Center-Content">
              <Button variant="primary" onClick={this.makeGuess}>
                Submit Guess
              </Button>{' '}
            </div>
            <div className="Game-Guess-Results Center-Content mt-3">
              {this.state.results[0] === 0 ? <BsX size={70} className="Incorrect-Guess"/> : <BsX size={70} />}
              {this.state.results[1] === 0 ? <BsX size={70} className="Incorrect-Guess"/> : <BsX size={70} />}
              {this.state.results[2] === 0 ? <BsX size={70} className="Incorrect-Guess"/> : <BsX size={70} />}
            </div>
          </>
        }
      </Container>
    );
  }

  async componentDidMount() {
    const url = `${config.api}/stream/random`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    this.setState({ stream: json.stream });
  }

  handleChange = (e) => {
    this.setState({guess: e.target.value});
  } 

  makeGuess = () => {
    var result = 0;
    if (this.state.guess.toLowerCase() === this.state.stream.user_name.toLowerCase()) {
      this.props.history.push(`/win/${this.state.stream.user_name}`);
    }
    this.state.results.push(result);
    if (this.state.results.length >= 3) {
      this.props.history.push(`/lose/${this.state.stream.user_name}`);
    }
    this.setState({results: this.state.results});
  }

}

export default withRouter(Game);
