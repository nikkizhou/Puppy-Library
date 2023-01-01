import type { WithId, Document } from 'mongodb'

interface Puppy extends WithId<Document>{
    name: string,
    bday: string,
    breed: string,
    id: number,
    image?:string
    
}

export = Puppy
