import React,{useState,useEffect} from 'react';
import './App.css';
import PuppyCard from './components/PuppyCard'
import { Puppy } from './interfaces';
import Form from './components/Form';
import PuppyCardDetail from './components/PuppyCardDetail';
import PuppyCardEditing from './components/PuppyCardEditing';
import clone from 'clone'


function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([])
  const [detailedPuppyId, setDetailedPuppyId] = useState<number>();
  const [editedPuppyId, setEditedPuppyId] = useState<number>();
  
  const changeDetailedPuppyId: Function = (id: number) => setDetailedPuppyId(id);
  const changeEditedPuppyId: Function = (id: number) => setEditedPuppyId(id);

  const detailedPuppy: Puppy = puppies?.find(p => p.id == detailedPuppyId ) as Puppy;
  const editedPuppy: Puppy = puppies?.find(p => p.id == editedPuppyId) as Puppy;
  
  const renderNewPuppy: Function = (newPuppy: Puppy) => setPuppies([...puppies, newPuppy])
  const renderDeletePuppy: Function = (id: number) => setPuppies(puppies.filter(p => p.id != id));
  const renderEditedPuppy: Function = (id: number, newPuppy:Puppy) => {
    const index: number = puppies.findIndex(p => p.id == editedPuppyId);
    const newPuppies = clone(puppies);
    newPuppies[index] = newPuppy;
    setPuppies(newPuppies);
  }
  
  useEffect(() => {
    const fetchPuppies = async () => {
      fetch('/api/puppies')
        .then((response) => response.json())
        .then((data) => setPuppies(data))
    }
    fetchPuppies();
  }, [])
  
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Puppy Library🐕</h1>
        <main className='puppyContainer'>
          {puppies?.map(p =>
            <PuppyCard
              key={p.id}
              puppy={p}
              changeDetailedPuppyId={changeDetailedPuppyId}
              renderDeletePuppy={renderDeletePuppy}
              changeEditedPuppyId={changeEditedPuppyId } />)}
        </main>
      {!detailedPuppyId && !editedPuppyId && <Form renderNewPuppy={renderNewPuppy} />}
      {detailedPuppyId && <PuppyCardDetail puppy={detailedPuppy} changeDetailedPuppyId={changeDetailedPuppyId} />}
      {editedPuppyId && <PuppyCardEditing
        puppy={editedPuppy}
        changeEditedPuppyId={changeEditedPuppyId}
        renderEditedPuppy={renderEditedPuppy } />}
      </header>
    </div>
  );
}

export default App;
