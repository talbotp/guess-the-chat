import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export default class Header extends React.Component {

  render() {
    return (
      <Navbar className="App-Navbar" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="Header-Title">Guess The Chat</Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Form inline>
            <Button variant="outline-info">  Sign In</Button>
          </Form>
        </Container>
      </Navbar>
    );
  }

}
