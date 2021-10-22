import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export class GenreView extends React.Component{
    render (){
        const { genre, onBackClick}= this.props;

        return (
            <Container>
              <Row className="genre-view">
                <Col>
                  <Card border="warning" style={{ width: "20rem" }}>
                    <Card.Body>
                      <Card.Title>{genre.Name}</Card.Title>
                      <Card.Text>{genre.Description}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Button variant="warning" onClick={() => { onBackClick(null); }}>Back</Button>
                </Col>
              </Row>
            </Container>
          );
    }
}