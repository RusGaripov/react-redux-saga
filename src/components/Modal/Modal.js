import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
function ModalWindow(props) {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [props.addRecord]);

  const handleClose = () => {
    setShow(false);
    props.addRecord(false);
  };

  const handleCloseSave = () => {
    if (record !== "") {
      setShow(false);
      props.addRecord(true, record);
    } else {
      setValid(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please,write the record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={record}
            onChange={(e) => setRecord(e.target.value)}
          ></input>
        </Modal.Body>
        {valid === true ? (
          <Modal.Body>
            <p>Record must contain 1 or more characters</p>
          </Modal.Body>
        ) : null}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleCloseSave}>
            Ок
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;
