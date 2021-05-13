import React from 'react';
import { v4 as uuid } from 'uuid';
import { ContentState, convertToRaw } from 'draft-js';
import styles from './NotesPage.module.scss';
import NotesList from './NotesList';
import NotesEditor from './NotesEditor';

const NotesPage = ({ notes, activeNote, setData }) => (
  <div>
    <div className={styles.container}>
      <NotesList notes={notes} activeNote={activeNote} setData={setData} />
      <NotesEditor notes={notes} activeNote={activeNote} setData={setData} />
    </div>
    <button
      type="button"
      onClick={() => {
        const newNotes = [
          {
            id: uuid(),
            title: 'New note',
            content: JSON.stringify(
              convertToRaw(ContentState.createFromText('')),
            ),
          },
        ];

        setData('notes', notes.concat(newNotes));
      }}
      className={styles.fixedButton}
    >
      Create new note!
    </button>
  </div>
);

export default NotesPage;
