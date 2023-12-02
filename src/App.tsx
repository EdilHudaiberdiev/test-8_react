import './App.css';
import Toolbar from './Components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import AddQuotes from './Containers/AddQuotes/AddQuotes';
import EditQuote from './Containers/EditQuote/EditQuote';

const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/quotes" element={<Home/>}/>
          <Route path="/quotes/add" element={<AddQuotes/>}/>
          <Route path="/quotes/:id/edit" element={<EditQuote/>}/>
          <Route path="/quotes/:category" element={<Home/>} ></Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
