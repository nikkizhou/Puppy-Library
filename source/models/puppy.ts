import type { WithId, Document } from 'mongodb'

interface Puppy extends WithId<Document>{
    name: string,
    bday: number,
    breed: string,
    id: number
}

export = Puppy
