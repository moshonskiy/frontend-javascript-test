import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { LESS_DATA_URL, MORE_DATA_URL } from "../../resources/urls";

export const ModalOnStart = ({ setModalToggle, setFetchUrlType }) => {
  const handleLessData = () => {
    setFetchUrlType(LESS_DATA_URL);
    setModalToggle(false);
  };
  const handleMoreData = () => {
    setFetchUrlType(MORE_DATA_URL);
    setModalToggle(false);
  };

  return (
    <div>
      <Modal.Dialog>
        <Modal.Header className="justify-content-md-center">
          Выберите вариант
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-md-center">
            <Col md={{ offset: 2 }}>
              <Button variant="secondary" onClick={handleLessData}>
                Меньше
              </Button>
            </Col>
            <Col md={{ offset: 1 }}>
              <Button variant="primary" onClick={handleMoreData}>
                Больше
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
