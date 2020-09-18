import './Login.scss';
import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector, actions } from '../store';

const server = process.env.REACT_APP_API_URL;

const Login: FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state);
  const reffEmailInput: React.RefObject<HTMLInputElement> = React.createRef();
  const reffPassInput: React.RefObject<HTMLInputElement> = React.createRef();

  function handleSubmit(e: any) {
    e.preventDefault();

    const data = {
      email: reffEmailInput.current?.value,
      password: reffPassInput.current?.value
    };

    signIn(data);

    // if (!reffEmailInput.current?.value || !reffPassInput.current?.value) {
    //   return;
    // } else {
    //   signIn(data);
    // }
  }

  function signIn(data: object) {
    fetch(`${server}/api/sign-in`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (response.status !== 200) return;

      const body = await response.json();

      dispatch(actions.setToken(body.token));
      dispatch(actions.setIsLoggedIn(true));
      dispatch(actions.setIsOpen(false));
    });
  }

  return (
    <div className="Login">
      <Button variant="link" onClick={() => dispatch(actions.setIsOpen(true))}>
        Login
      </Button>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Please sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control ref={reffEmailInput} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={reffPassInput} type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
