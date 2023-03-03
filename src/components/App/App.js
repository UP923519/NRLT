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
      <h1>Carbon Tracker</h1>
      <div className = "topBanner1">
        <h4> Welcome, {localStorage.getItem('username')}
        {displayAction && <p>I am writing JSX</p>}
        <button className = "logOut" onClick={removeToken}>
            Log Out
        </button> </h4>
      </div>
      <div>
        <Navbar />
      </div>

    </div>
  );
}

export default App;