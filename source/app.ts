import express, { response } from "express";
import { Request, Response, Application } from 'express';
import { collections } from "./services/mongoDb";
import Puppy from "./models/puppy";
import { getPuppies,getPuppy, addOnePuppy,updateOnePuppy,deleteOnePuppy } from "./controllers/puppies";
import cors from 'cors'
import { connectToDatabase } from "./services/mongoDb"


const app: Application = express();

connectToDatabase()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get('/api/puppies', getPuppies);
    app.get('/api/puppies/:id', getPuppy);
    app.post('/api/puppies', addOnePuppy);
    app.put('/api/puppies/:id', updateOnePuppy);
    app.delete('/api/puppies/:id', deleteOnePuppy);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });



export default app;
