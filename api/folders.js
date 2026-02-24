import express from "express";
const router = express.Router();
export default router; //export the router

import { createFile } from "#db/queries/files";
import { getFolderById, getFolders } from "#db/queries/folders";
// route to "/" , app.js will send to /folders as root
// get /folder sends array of all folders
router.get("/", async (req, res)=>{
  const folders = await getFolders();
  res.send(folders);
})

// get /files sends array of all files
// router.get("/files", async (req, res)=>{
//   const files = await getFiles();
//   res.send(files);
// });

// router.param will allow reuseable logic for parsing the "id" parameter
router.param("id", async(req, res, next, id)=>{
  // find the specific id

  const folder = await getFolderById(id);
  if (!folder) res.status(404).send('Folder does not exist.');

  // attach folder to req so rest of middleware below it can access
  req.folder = folder;
  next();
});

// get /folder/:id sends folder with given id and files within
router.get("/:id", (req, res)=>{
  res.send(req.folder)
});


// POST /folders/:id/files
  // Sends 404 error message if folder doesn't exist (handled by param above)
  // Sends 400 if request body is not provided
  // Sends 400 if request body is missing required fields
  // Creates a new file related to the specified folder and sends the file back with status 201

router.post("/:id/files", async (req, res)=>{
  if (!req.body) res.status(400).send('body is not provided.');
  
  const {name, size} = req.body;
  if (!name || !size) {
    res.status(400).send('body is missing required fields.')
  };

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
