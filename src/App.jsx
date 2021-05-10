import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import TitleBar from './components/TitleBar/TitleBar';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NotesEditor from './components/NotesEditor/NotesEditor';

import './App.scss';

const App = () => {
  const [cookies, setCookies] = useCookies(['notes', 'userData']);

  useEffect(() => {
    if (cookies.notes === 'undefined') {
      setCookies('notes', []);
    }
  });

  return (
    <div className="box">
      <TitleBar />
      {JSON.stringify(cookies.notes) === '[]' ? (
        <WelcomePage setCookies={setCookies} />
      ) : (
        <NotesEditor cookies={cookies} setCookies={setCookies} />
      )}
    </div>
  );
};
export default App;
