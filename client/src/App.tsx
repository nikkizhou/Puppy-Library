import React,{useState,useEffect} from 'react';
import './App.css';
import PuppyCard from './components/PuppyCard'
import { Puppy } from './interfaces';
import Form from './components/Form';
import PuppyCardDetail from './components/PuppyCardDetail';


function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([])
  const [puppyId, setPuppyId] = useState<number>();
  
  const changePuppyId: Function = (id: number) => setPuppyId(id);
  const detailedPuppy: Puppy = puppies?.find(p => p.id == puppyId ) as Puppy;
  const renderNewPuppy: Function = (newPuppy: Puppy) => setPuppies([...puppies, newPuppy])
  const renderDeletePuppy: Function = (id: number) => setPuppies(puppies.filter(p => p.id != id));

  // puppies && console.log(puppies, 'puppies in App');
  // detailedPuppy && console.log(detailedPuppy, 'detailedPuppy in App');
  // console.log(puppyId, "puppyId  in App");
  
  
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
        <h1>Puppy Library</h1>
        <main className='puppyContainer'>
          {puppies?.map(p =>
            <PuppyCard
            puppy={p}
            changePuppyId={changePuppyId}
            renderDeletePuppy={renderDeletePuppy} />)}
        </main>
        {puppyId &&
          <PuppyCardDetail
          puppy={detailedPuppy}
          changePuppyId={changePuppyId} />}
        <Form renderNewPuppy={renderNewPuppy} />
      </header>
    </div>
  );
}

export default App;
