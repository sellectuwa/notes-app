import React, { useState } from 'react';
import TitleBar from './components/TitleBar/TitleBar';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NotesPage from './components/NotesPage/NotesPage';

import './App.scss';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActive] = useState('');

  const setData = (dataName, value) => {
    if (dataName === 'json') {
      const data = JSON.parse(value);
      setNotes(data.notes);
      setActive(data.activeNote);
    } else if (dataName === 'notes') {
      setNotes(value);
    } else if (dataName === 'activeNote') {
      setActive(value);
    }
  };

  return (
    <>
      <div className="box">
        <TitleBar notes={notes} activeNote={activeNote} />
        {JSON.stringify(notes) === '[]' ? (
          <WelcomePage setData={setData} />
        ) : (
          <>
            <NotesPage
              notes={notes}
              activeNote={activeNote}
              setData={setData}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
