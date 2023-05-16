import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginCntainer } from './containers/login.container';
import { RegisterContainer } from './containers/register.container';
import AppContainer from './containers/app.container';

function App() {
  return (
    <>
      <header>
        <Link to="/"></Link>
        <Link to="/login"></Link>
        <Link to="/main"></Link>
      </header>
      <Routes>
        <Route path='/' element={<RegisterContainer />} />
        <Route path='/login' element={<LoginCntainer />} />
        <Route path='/main' element={<AppContainer />} />
      </Routes>
    </>
  );
}

export default App;
