import { Request, Response, Application } from 'express';
import {  connectToDatabase } from "../services/mongoDb";
import Puppy from "../models/puppy";
import axios from 'axios';

const asyncWrapper = async (req: Request, res: Response, statusCode: number, cb: Function) => {
  const collections = await connectToDatabase();
  const id = Number(req?.params?.id);
  await cb(id, collections)
    .then((data:any) => res.status(statusCode).json(data))
    .catch((error:Error) => res.status(500).json({ error: error.message }))
}

const badReq = (res:Response, operation: string) =>
  res.status(400).json({ error: `Failed to ${operation}. Please provide request body` });

const fetchPuppyImg = async (req: Request, res: Response) => {
  const puppyBreed = encodeURI(req.body.breed); 
  //const url = `https://api.unsplash.com/search/photos?query=${puppyBreed}&client_id=${process.env.UNSPLASH_API_KEY}`
  const url = `https://dog.ceo/api/breed/${puppyBreed}/images/random`
  const image: string = await axios.get(url)
    // .then(result => result.data.results[1].urls.small)
    .then((result: any) =>result.data.message)
    .catch(err => console.log(err))
  return image;
}

export const  getPuppies = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 200, async (id:number,collections:any) =>
    collections.puppies?.find({}).toArray())
};

export const getPuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 200, async (id: number, collections: any) =>
    collections.puppies?.findOne({ id }))
};


export const addOnePuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 201, async (_: any, collections: any) => {
    if (!req.body) return badReq(res, 'add')
    const puppies = (await collections.puppies?.find({}).toArray()) as Puppy[];
    const id = puppies.length==0? 1:puppies[puppies.length - 1].id + 1
    const image = await fetchPuppyImg(req, res)
    const newPuppy = { id, image, ...req.body }; 
    await collections.puppies?.insertOne(newPuppy);
    return newPuppy;

  })
};

export const addManyPuppies = async (req: Request, res: Response) => {
  if (!req.body) return badReq(res, 'add')
  await asyncWrapper(req, res, 200,
    async (id: number, collections: any) => 
      collections.puppies?.insertMany(req?.body)
  
)};

export const updateOnePuppy = async (req: Request, res: Response) => {
  if (!req.body) return badReq(res, 'update')
  const image = await fetchPuppyImg(req, res)
  const newPuppy = { image, ...req.body }; 
  await asyncWrapper(req, res, 200,
    async (id: number, collections: any) => 
      collections.puppies?.findOneAndUpdate({ id }, { $set: newPuppy }, { returnDocument: 'after' })
  ); //pay attention to set here 
  
};

export const deleteOnePuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 202,
    async (id: number, collections: any) =>
      collections.puppies?.deleteOne({ id }))
};
