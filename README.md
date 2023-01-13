## 👉[Live Deomo](https://puppies-library.vercel.app/) 

## Description:   
A fullstack app with CRUD operations related to mongodb database. 
User can add, edit, delete and check details of the puppies in the library.
The picture of the puppy is fetched from dog.ceo api based on the breed of the dog.

## Tech Stack:   
MERN stack(MongoDb, Express, Reat, NodeJs) , typescript  

## API route
|               |  Method |  Route           |
| :-------------|:--------| :-------------   |
| getPuppies    |  GET    | /api/puppies    |
| getPuppy      |  GET    | /api/puppies/:id |
| addOnePuppy   |  POST   | /api/puppies     |
|addManyPuppies |  POST   | /api/puppies/many|
|updateOnePuppy |  PUT    | /api/puppies/:id | 
|deleteOnePuppy | DELETE  | /api/puppies/:id |
