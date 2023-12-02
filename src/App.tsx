import './App.css';
import Toolbar from './Components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import AddQuotes from './Containers/AddQuotes/AddQuotes';

const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/quotes/add" element={<AddQuotes/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
