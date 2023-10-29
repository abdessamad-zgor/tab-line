import Sheet  from './components/Sheet';
import { Toolbar } from './components/Toolbar';

function App() {
  
  return (
    <main className="bg-stone-100 w-full min-h-screen">
      <Toolbar/>
      <Sheet/>
    </main>
  );
}

export default App
