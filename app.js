import express from "express";
const app = express();
export default app;

// import the routers from api
import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

// use express json body parser
app.use(express.json());

// invoke the /folder router 
app.use("/folders", foldersRouter)

app.use("/files", filesRouter)

// add error 500 handler
app.use((err, req, res, next)=>{
  console.error(err);
  res.status(500).send(`Fatal error!`);
})