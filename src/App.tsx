import { Toaster } from 'sonner';
import './App.css';
import ListOfUsers from './components/ListOfUsers';

function App() {


  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <ListOfUsers />
      <Toaster richColors />
    </div>
  );
}

export default App;
