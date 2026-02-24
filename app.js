import express from "express";
const app = express();
export default app;

// import the routers from api
import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

// use express json body parser
app.use(express.json());

// invoke the routers
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

// PostgreSQL errors have codes that we can check to send better
// error messages to the client.
app.use((err, req, res, next) => {
  // Unique constraint violation
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

// add error 500 handler
app.use((err, req, res, next)=>{
  console.error(err);
  res.status(500).send(`Fatal error!`);
})