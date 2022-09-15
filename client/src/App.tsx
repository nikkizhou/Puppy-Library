import React,{useState,useEffect} from 'react';
import './App.css';
import PuppyCard from './components/PuppyCard'
import { Puppy } from './interfaces';
import Form from './components/Form';
import PuppyCardDetail from './components/PuppyCardDetail';


function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([])
  const [puppyId, setPuppyId] = useState<number>();
  
  const detailedPuppy:Puppy = puppies?.find(p => p.id = puppyId as number) as Puppy;
  const renderNewPuppy: Function = (newPuppy: Puppy) => setPuppies([...puppies, newPuppy]);
  const changePuppyId: Function = (id: number) => {
    console.log(id,"id in App");
    id && setPuppyId(id);
  }
  
  puppies && console.log(puppies, 'puppies');

  useEffect(() => {
    const fetchPuppies = async () => {
      fetch('/api/puppies')
        .then((response) => response.json())
        .then((data) => {
          console.log(data,"data");
          setPuppies(data)
        })
    }
    fetchPuppies();
  }, [])
  
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Puppy Library</h1>
        <main className='puppyContainer'>
          {puppies?.map(p => <PuppyCard
          puppy={p} changePuppyId={changePuppyId} />)}
        </main>
        {puppyId && <PuppyCardDetail
          puppy={detailedPuppy}
          changePuppyId={changePuppyId} />}
        <Form renderNewPuppy={renderNewPuppy} />
      </header>
    </div>
  );
}

export default App;
