import './Login.scss';
import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector, actions } from '../store';

const server = process.env.REACT_APP_API_URL;

const AddMatch: FC = () => {
  const dispatch = useDispatch();
  const { token, isModalAddMatch } = useSelector((state) => state);

  const reffScore: React.RefObject<HTMLInputElement> = React.createRef();
  const reffDate: React.RefObject<HTMLInputElement> = React.createRef();
  const reffTeamA: React.RefObject<HTMLInputElement> = React.createRef();
  const reffTeamB: React.RefObject<HTMLInputElement> = React.createRef();
  const reffTitle: React.RefObject<HTMLInputElement> = React.createRef();
  const reffTournament: React.RefObject<HTMLInputElement> = React.createRef();
  const reffStatus: React.RefObject<HTMLInputElement> = React.createRef();

  function handleSubmit(e: any) {
    e.preventDefault();

    const data = {
      score: reffScore.current?.value,
      date: reffDate.current?.value,
      teamA: reffTeamA.current?.value,
      teamB: reffTeamB.current?.value,
      title: reffTitle.current?.value,
      tournament: reffTournament.current?.value,
      status: reffStatus.current?.value
    };

    addMatch(data);
  }

  function addMatch(data: object) {
    fetch(`${server}/api/match`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (response.status !== 200) return;

      const body = await response.json();

      dispatch(actions.addMatches(body));
      dispatch(actions.setModalAddMatch(false));
    });
  }

  return (
    <div className="AddMatch">
      <Button variant="link" onClick={() => dispatch(actions.setModalAddMatch(true))}>
        Add match
      </Button>
      <Modal show={isModalAddMatch}>
        <Modal.Header>
          <Modal.Title>Add new match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicScore">
              <Form.Label>Add score</Form.Label>
              <Form.Control ref={reffScore} type="text" placeholder="score" />
            </Form.Group>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Add date</Form.Label>
              <Form.Control ref={reffDate} type="date" placeholder="date" />
            </Form.Group>
            <Form.Group controlId="formBasicTeamA">
              <Form.Label>Add team A</Form.Label>
              <Form.Control ref={reffTeamA} type="text" placeholder="teamA" />
            </Form.Group>
            <Form.Group controlId="formBasicTeamB">
              <Form.Label>Add team B</Form.Label>
              <Form.Control ref={reffTeamB} type="text" placeholder="teamB" />
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Add title</Form.Label>
              <Form.Control ref={reffTitle} type="text" placeholder="title" />
            </Form.Group>
            <Form.Group controlId="formBasicTournament">
              <Form.Label>Add tournament</Form.Label>
              <Form.Control ref={reffTournament} type="text" placeholder="tournament" />
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
              <Form.Label>Add status</Form.Label>
              <Form.Control ref={reffStatus} type="text" placeholder="status" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMatch;
