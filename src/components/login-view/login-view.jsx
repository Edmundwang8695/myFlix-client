
import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props){
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
      };

    return(
        <Row className="justify-content-md-center">
        <form>
            <Col md={4}>
            <label>
                Username:
                <input type='text' value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <button className='loginButton' type='submit' onClick={handleSubmit}>Submit</button>
            </Col>
        </form>
        </Row>
    );
}
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };