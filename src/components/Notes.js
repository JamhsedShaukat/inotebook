import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const { notes, getNote, editeNote } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        try {
          await getNote();
        } catch (error) {
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
        setLoading(false);
      }
    };
    fetchData();
  }, [getNote, navigate]);

  const updateNote = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editeNote(note.id, note.etitle, note.edescription, note.etag);
    setShowModal(false);
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddNote showAlert={props.showAlert} />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Update Note
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="container row">
            <h3 className="my-2">Your Notes</h3>
            <div className="container mx-1 my-2">
              {notes.length === 0 && "No notes added"}
            </div>
            {notes.map((note) => (
              <NoteItems
                key={note._id}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={note}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Notes;
