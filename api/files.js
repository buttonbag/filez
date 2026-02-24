import { getFiles } from "#db/queries/files";
import express from "express";
const router = express.Router();
export default router; //export the router

// route to "/" , app.js will send to /folders as root
// get /folder sends array of all folders
router.get("/", async (req, res)=>{
  const files = await getFiles();
  res.send(files);
})

// get /folder/:id sends folder with given id and files within
router.get("/:id", (req, res)=>{});

// get /files sends array of all files
router.get("/files", (req, res)=>{});

// POST /folders/:id/files
// --the name of the containing folder should be 
// included as folder_name
router.get("/:id/files", (req, res)=>{});
