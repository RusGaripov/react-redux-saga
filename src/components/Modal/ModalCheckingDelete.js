import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
function ModalCheckingDelete(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [props.deleteRecord]);

  const handleClose = () => {
    setShow(false);
    props.deleteRecord(false);
  };

  const handleCloseAndDelete = () => {
    setShow(false);
    props.deleteRecord(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are You sure to delete record ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Нет
          </Button>
          <Button variant="primary" onClick={handleCloseAndDelete}>
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCheckingDelete;
