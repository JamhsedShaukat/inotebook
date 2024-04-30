import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import NoteItems from "./NoteItems.js";
import AddNote from "./AddNote.js";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(NoteContext);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const { notes, getNote, editeNote } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        try {
          await getNote();
        } catch (error) {
          // Handle authentication error (e.g., redirect to login)
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
    // eslint-disable-next-line
  }, []);

  

  const [note,setNote]=useState({id: " ",etitle:"",edescription:"",etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    // props.showAlert("updated successfully ", "success");
  };
  // const context = useContext(NoteContext);
  // const { addNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleSubmit = (e)=>{
    editeNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("updated successfully ", "success");


    // e.preventDefault();
    // addNote(note.title,note.description,note.tag);
   
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value});

  }

  return (
    <> 
    {loading ? (
        <p>Loading...</p>
      ) :(
        <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // value={note.etitle}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    aria-describedby="emailHelp"
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit }>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row">
        <h3 className="my-2">Your Notes</h3>
        <div className="container mx-1 my-2">
        {notes.length===0 && " no notes is added "}
        </div>
        {notes.map((note) => {
          return (
            <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
      </>
      )}
    </>
  );
};

export default Notes;
