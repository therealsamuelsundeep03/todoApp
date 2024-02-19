import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ModalPopup({
  show,
  setShow,
  handleCheck,
  handleShow,
  deletetask,
  modalHead,
  modalBody,
  modalButton,
  setTaskExists,
  taskExists
}) {
  return (
    <>
      <Modal show={show || taskExists}  onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHead}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer responsive="md" style={{ display: "flex" }}>
          {modalHead !== "Alert Message" && (
            <Col>
              <Button variant="secondary" className="sm-3" onClick={handleShow}>
                Close
              </Button>
            </Col>
          )}
          <Col>
            <Button
              variant="primary"
              className="sm-3"
              onClick={() => {
                modalHead === "Alert Message" ? setTaskExists(false) : handleCheck(deletetask);
              }}
            >
              {modalButton}
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;
