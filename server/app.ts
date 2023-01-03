import express from "express";
import { Application } from 'express';
import { getPuppies, getPuppy, addOnePuppy, updateOnePuppy, deleteOnePuppy, addManyPuppies } from "./controllers/puppies";
import cors from 'cors'
import * as dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/puppies', getPuppies);
app.get('/api/puppies/:id', getPuppy);
app.post('/api/puppies', addOnePuppy);
app.put('/api/puppies/:id', updateOnePuppy);
app.delete('/api/puppies/:id', deleteOnePuppy);
app.post('/api/puppies/many', addManyPuppies);

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});

export default app;
