import { Puppy } from "../interfaces"


export const updatePuppyInDb = async (id: number, newPuppy: Puppy) => {
  return await fetch(`/api/puppies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newPuppy.name, bday: newPuppy.bday, breed: newPuppy.breed })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const deletePuppyInDb = async (id: number) => {
  await fetch(`/api/puppies/${id}`, { method: 'DELETE' })
    .catch(err => console.log(err))
}

export const addPuppyInDb = async (newPuppy: Puppy) => {
  return await fetch('/api/puppies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPuppy)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const fetchPuppies = async (setPuppies:Function) => {
  await fetch('/api/puppies')
    .then((response) => response.json())
    .then((data) => setPuppies(data))
}
