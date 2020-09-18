import './Example.scss';
import React, { FC, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector, actions } from '../store';

const server = process.env.REACT_APP_API_URL;

const Example: FC = () => {
  const dispatch = useDispatch();
  const { exampleText } = useSelector((state) => state);

  function exampleRequest() {
    fetch(`${server}/api/example`, {
      method: 'GET',
      mode: 'cors'
    }).then(async (response) => {
      if (response.status !== 200) return;

      const body = await response.json();

      dispatch(actions.setExampleText(body.text));
    });
  }

  return (
    <div className="Example">
      <Button onClick={exampleRequest}>Load example text</Button>
      <Modal show={!!exampleText}>
        <Modal.Header>
          <Modal.Title>Example Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={exampleText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(actions.setExampleText(e.target.value));
            }}
            placeholder="Example text"
            type="text"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => dispatch(actions.setExampleText(''))}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Example;
