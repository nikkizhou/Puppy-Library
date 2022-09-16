import { Request, Response, Application } from 'express';
import { collections } from "../services/mongoDb";
import Puppy from "../models/puppy";
import axios from 'axios';

export const asyncWrapper = async (req: Request, res: Response, statusCode:number,cb:Function) => {
  try {
    const id = Number(req?.params?.id);
    const data = await cb(id)
    return data ? res.status(statusCode).json(data) : res.status(500).json({ error: 'Failed to get data' })
  }
  catch (error) {
    return error instanceof Error && res.status(400).json({ error: error.message });
  }
}

export const  getPuppies = async (req: Request, res: Response) => {
  // try {
  //   const puppies = (await collections.puppies?.find({}).toArray()) as Puppy[];
  //   //console.log(puppies,"puppies in contronller");
    
  //   res.status(200).json(puppies);
  // } catch (error) {
  //   error instanceof Error && res.status(500).json({error: error.message});
  // }
  await asyncWrapper(req, res, 200, async () =>
    collections.puppies?.find({}).toArray())
};

export const getPuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 200, async (id: number) =>
    collections.puppies?.findOne({ id }))
};

const fetchPuppyImg = async (req: Request, res: Response) => {
  const puppyBreed = req.body.breed
  const url = `https://api.unsplash.com/search/photos?query=${puppyBreed}&client_id=${process.env.UNSPLASH_API_KEY}`
  const image:string = await axios.get(url)
    .then(result => result.data.results[1].urls.small)
    .catch(err => console.log(err))
  return image;
  
}

export const addOnePuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 201, async () => {
    const puppies = (await collections.puppies?.find({}).toArray()) as Puppy[];
    const id = puppies.length==0? 1:puppies[puppies.length - 1].id + 1

    if (req.body) {
      const image = await fetchPuppyImg(req, res)
      const newPuppy = { id, image, ...req.body }; //destructure
      
      await collections.puppies?.insertOne(newPuppy);
      console.log(newPuppy," newPuppy in controller");
      return newPuppy;
    } else {
      res.json({error: "Failed to add. Please provide request body"});
    }
  })
};

export const addManyPuppies = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 200, async (id: number) => { 
    console.log(req?.body);
    collections.puppies?.insertMany(req?.body)
  }
)};

export const updateOnePuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 200,(id: number) =>
    collections.puppies?.findOneAndUpdate({ id }, { $set: req?.body })); //pay attention to set here
};


export const deleteOnePuppy = async (req: Request, res: Response) => {
  await asyncWrapper(req, res, 202, (id: number) =>
    collections.puppies?.deleteOne({ id }))
};
