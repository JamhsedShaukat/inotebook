const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes.js");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// route 1: Get all the notes using: GET "/api/notes//fetchallnotes" log in require

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// route 2: To add notes using: Post "/api/notes//addnote" log in require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "name contains min 3 char ").isLength({ min: 3 }),
    body("description", "name contains min 5 char ").isLength({ min: 5 }),
    body("tag", "name contains min 3 char ").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await notes.save();
      res.json(savenote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
  }
);

// route 3: To update an existing notes using: PUT "/api/notes/updatenote" log in require

router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        //create a note object

        const newnote = {};
        if(title){newnote.title=title};
        if(description){newnote.description=description};
        if(tag){newnote.tag=tag};

        //Find the note to be updated and update it
        
        let note =await Notes.findById(req.params.id);
        if(!note){
            
            return res.status(404).send("not found ")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed")

        }
        note = await Notes.findByIdAndUpdate(req.params.id,{
            $set:newnote
        },{new:true})
        res.json({note});
      }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
      }



    })

    // route 4: To delete an existing notes using: DELETE "/api/notes/deletenote" log in require

    router.delete(
      "/deletenote/:id",
      fetchuser,
      async (req, res) => {
        try {
          const { title, description, tag } = req.body;
          //create a note object
  
          //Find the note to be deleted and delete it
          
          let note =await Notes.findById(req.params.id);
          if(!note){
              
              return res.status(404).send("not found ")
          }

          //allowing deletion only if user own this 

          if(note.user.toString()!==req.user.id){
              return res.status(401).send("not allowed")
  
          }

          note = await Notes.findByIdAndDelete(req.params.id);
          res.json({"success":"note has be deleted"});
        } catch(error){
          console.error(error.message);
          res.status(500).send('Server Error');
        }
  
  
      })

module.exports = router;
