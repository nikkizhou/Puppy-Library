import React,{useState,useEffect} from 'react';
import './App.css';
import PuppyCard from './components/PuppyCard'
import { Puppy } from './interfaces';
import Form from './components/Form';
import { updatePuppyInDb, deletePuppyInDb, addPuppyInDb, fetchPuppies } from './utils/dbQueries'

function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([])
  useEffect(() => {fetchPuppies(setPuppies)}, [])

  const updatePuppy: Function = async (id: number, newPuppy: Puppy) => {
    const newPuppyWithImg = await updatePuppyInDb(id, newPuppy)
    const newPuppies = puppies.map(p => p.id == id ? newPuppyWithImg?.value : p)
    setPuppies(newPuppies);
  }

  const deletePuppy: Function = async (id:number) => {
    setPuppies(puppies.filter(p => p.id != id))
    await deletePuppyInDb(id);
  }

  const addPupppy: Function = async (newPuppy: Puppy) => {
    const newPuppyWithImg = await addPuppyInDb(newPuppy)
    setPuppies([...puppies, newPuppyWithImg])
  }

  const PuppyList = () =>
    <main className='puppyContainer'>
      {puppies?.map((p,index) =>
        <PuppyCard
          key={index}
          puppy={p}
          deletePuppy={deletePuppy}
          updatePuppy={updatePuppy}
        />)}
    </main>
  
  return (
    <div className="App" >
      <h1>Puppy Library🐕</h1>
      <PuppyList />
      <Form addPupppy={addPupppy} />
    </div>
  );
}

export default App;
