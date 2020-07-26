import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export const TableRowItem = ({
  tableRowItemInfo,
  setTableRowItemToggle,
  setTableRowItemInfo,
}) => {
  const {
    firstName,
    description,
    address: { streetAddress, city, state, zip },
  } = tableRowItemInfo;

  const handleClick = () => {
    setTableRowItemToggle(false);
    setTableRowItemInfo({});
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Card.Text className="col-md-11">Строка таблицы</Card.Text>
          <Button variant="secondary" onClick={handleClick}>
            &times;
          </Button>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>Выбран пользователь</Col>
          <Col>
            <b>{firstName}</b>
          </Col>
        </Row>
        <Row>
          <Col>Описание:</Col>
          <Col>
            <textarea defaultValue={description}></textarea>
          </Col>
        </Row>
        <Row>
          <Col>Адрес проживания:</Col>
          <Col>
            <b>{streetAddress}</b>
          </Col>
        </Row>
        <Row>
          <Col>Город:</Col>
          <Col>
            <b>{city}</b>
          </Col>
        </Row>
        <Row>
          <Col>Провинция/штат:</Col>
          <Col>
            <b>{state}</b>
          </Col>
        </Row>
        <Row>
          <Col>Индекс:</Col>
          <Col>
            <b>{zip}</b>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
