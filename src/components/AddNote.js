import React, { useContext,useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote, getNote } = context;

    const [note,setNote]=useState({title:"",description:"",tag:""});
    const [validationErrors, setValidationErrors] = useState({
      title: "",
      description: "",
      tag: "",
    });

    const handleSubmit = (e)=>{
      e.preventDefault();

      if (note.title.length < 3) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title must contain at least 3 characters.",
        }));
        return;

      // addNote(note.title,note.description,note.tag);
     
      }

      if (note.description.length < 5) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          description: "Description must contain at least 5 characters.",
        }));
        return;
      }

      if (note.tag.length < 3) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          tag: "Tag must contain at least 3 characters.",
        }));
        return;
      }

      // Clear validation errors
    setValidationErrors({ title: "", description: "", tag: "" });

    // Call addNote if validation passes
    addNote(note.title, note.description, note.tag);

    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added successfully ", "success");

    // for testing only
    getNote();

  };


    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});

    };


  return (    
      <div className="">
        <h1 className="">Add a Note</h1>
        <form className="my-2  h-50 bg-light p-4 ">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="titleError"
              value={note.title}
              onChange={onChange}
            />
             {validationErrors.title && (
            <div id="titleError" className="form-text text-danger">
              {validationErrors.title}
            </div>
          )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              aria-describedby="descriptionError"
              value={note.description}
              onChange={onChange}
            />
            {validationErrors.description && (
            <div id="descriptionError" className="form-text text-danger">
              {validationErrors.description}
            </div>
          )}
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="tagError"
              value={note.tag}
              onChange={onChange}
            />
            {validationErrors.tag && (
            <div id="tagError" className="form-text text-danger">
              {validationErrors.tag}
            </div>
          )}
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Add Note
          </button>
        </form>
      </div>
  );
};

export default AddNote;
