import React, { useState } from "react";
import PropTypes from "prop-types";

import "./registration-view.scss";
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';

export function RegistrationView(props){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] =useState("");

    const handleSubmit=(e) =>{
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegistration(username)
    };

    return (
        <Row className="justify-content-md-center">
            <Col lg={3}>
        <form>
            <label className="username">
                Username: 
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label className="password">
                Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="email">
                Email: <input type = "email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="birthdate">
                Birthdate: <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </label>
            <button className="registerbutton" type="submite" onClick={handleSubmit}>
                Register
            </button>
        </form>
        </Col>
        </Row>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func.isRequired,
  };