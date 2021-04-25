import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
function ModalChooseRecord(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, [props.closeInfoWindow]);

  const handleClose = () => {
    setShow(false);
    props.closeInfoWindow(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>InfoWindow</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please,choose the record You want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChooseRecord;
