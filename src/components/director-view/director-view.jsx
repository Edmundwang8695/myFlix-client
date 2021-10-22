import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";


export class DirectorView extends React.Component {
  render() {
    const {  onBackClick, director} = this.props;

    return (
      <Container>
        <Row className="director-view">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{director.Name}</Card.Title>
                <Card.Text>{director.Bio}</Card.Text>
              </Card.Body>
            </Card>
            <Button variant="warning" onClick={() => {onBackClick(null);}}>Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
