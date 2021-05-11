import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import TitleBar from './components/TitleBar/TitleBar';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NotesPage from './components/NotesPage/NotesPage';

import './App.scss';

const App = () => {
  const [cookies, setCookies] = useCookies(['notes', 'activeNote']);

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
        <NotesPage cookies={cookies} setCookies={setCookies} />
      )}
    </div>
  );
};
export default App;
