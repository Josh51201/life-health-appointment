import { useDispatch } from 'react-redux';
import Links from './Links';
import { userAccSuccess } from '../actions/userAction.js';

const App = () => {
  const dispatch = useDispatch();
  const userFromStorage = localStorage.getItem('user');
  const currentUser = userFromStorage
    ? JSON.parse(userFromStorage)
    : { username: 'Guest' };

    localStorage.clear();

  dispatch(userAccSuccess(currentUser));
  return (
    <div className="App">
      <Links />
    </div>
  );
};

export default App;
