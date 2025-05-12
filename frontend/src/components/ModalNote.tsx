import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import StarRatingModal from "./StarRatingModal";
import { GeneralContext } from "../context/GeneralContext";

interface IModalProps {
  show: boolean;
  onHide: () => void;
}

export function ModalNote({ show, onHide }: IModalProps) {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("GeneralContext must be used within a GeneralProvider");
  }

  const { saveAction, modalData, setModalData, cancelAction } = context;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Notes for {modalData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Your Rating:</Form.Label>
          <StarRatingModal
            value={modalData.rating}
            onRatingChange={(newRating: number): void => {
              setModalData({ ...modalData, rating: newRating });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Your Notes:</Form.Label>
          <Form.Control
            name="notes"
            onChange={(value): void => {
              setModalData({ ...modalData, notes: value.target.value });
            }}
            value={modalData.notes}
            type="text"
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cancelAction}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={saveAction}>
          Save Notes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
