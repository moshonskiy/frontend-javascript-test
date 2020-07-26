import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

export const NewTableItemForm = ({ setNewTableItemToggle, setTableData }) => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTableItemInfo = { id, firstName, lastName, email, phone };
    setId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");

    setTableData((prevState) => [newTableItemInfo, ...prevState]);

    setNewTableItemToggle(false);
  };

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Button
          variant="secondary"
          onClick={() => setNewTableItemToggle(false)}
        >
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>id</Form.Label>
            <Form.Control
              type="number"
              name="id"
              placeholder="enter id"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="enter first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="enter phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!id || !firstName || !lastName || !email || !phone}
          >
            Добавить в таблицу
          </Button>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
