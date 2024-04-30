
import React, { useContext } from "react";

import NoteContext from "../context/notes/NoteContext.js";

const NoteItems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote} =context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="conatiner col-md-4">
        {/* <p>title:{note.title}</p>
        <p>description: {note.description}</p> */}
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">Title: {note.title}</h5>
            <p className="card-text">
            Description: {note.description}

            </p>
            <p className="card-text">
             tag:#{note.tag}
            </p>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                props.showAlert("deleted successfully ", "success");
              }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {updateNote(note);}}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItems;
