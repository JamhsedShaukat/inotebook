import React, { useState } from "react";
import NoteContext from "./NoteContext.js";
// import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Gets All Notes
  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    try {
      // TO CALL API
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note. Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log("New note added:", json);

      // You may want to update the local state here if needed
      // const newNotes = [...notes, json];
      // setNotes(newNotes);
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  // DELETE A NOTE
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);

    //client site
    // console.log("deleting with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // EDIT A NOTE
  const editeNote = async (id, title, description, tag) => {
    try {
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update note with ID: ${id}`);
      }

      // Logic to edit on the client
      const updatedNote = { _id: id, title, description, tag };
      const updatedNotes = notes.map((note) =>
        note._id === id ? updatedNote : note
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editeNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
