import { getFolderById, getFolders } from "#db/queries/folders";
import express from "express";
const router = express.Router();
export default router; //export the router

// route to "/" , app.js will send to /folders as root
// get /folder sends array of all folders
router.get("/", async (req, res)=>{
  const folders = await getFolders();
  res.send(folders);
})

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

// get /files sends array of all files
// router.get("/files", (req, res)=>{});

// POST /folders/:id/files
// --the name of the containing folder should be 
// included as folder_name
// router.get("/:id/files", (req, res)=>{});
