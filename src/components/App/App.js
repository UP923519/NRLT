import Navbar from '../Navbar/Navbar.js';
import Login, {} from '../Login/Login';
import useToken from './useToken';
import cors from 'cors';

export const theUser = localStorage.getItem('username');

function App() {
  const { token, setToken, removeToken, getToken} = useToken();
  const greeting = "greeting";
  const displayAction = false;

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (   
    <div className="wrapper">
      <h1 className = "title">Carbon Tracker Web Application</h1>
      <div className = "topBanner1">
        <h4 className = "topRow1"> Welcome, {localStorage.getItem('username')} </h4>
        {displayAction && <p>I am writing JSX</p>}
        <button className = "topRow1" onClick={removeToken}>
            Log Out
        </button>
      </div>
      <div>
        <Navbar />
      </div>

    </div>
  );
}

export default App;