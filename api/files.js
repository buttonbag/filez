import express from "express";
const router = express.Router();
export default router; //export the router

import { getFiles } from "#db/queries/files";
// route to "/" , app.js will send to /folders as root
// get /folder sends array of all folders
router.get("/", async (req, res)=>{
  const files = await getFiles();
  res.send(files);
})

