import React from 'react';
import { v4 as uuid } from 'uuid';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import styles from './NotesPage.module.scss';
import NotesList from './NotesList';
import NotesEditor from './NotesEditor';

const NotesPage = ({ cookies, setCookies }) => (
  <div>
    <div className={styles.container}>
      <NotesList cookies={cookies} setCookies={setCookies} />
      <NotesEditor cookies={cookies} setCookies={setCookies} />
    </div>
    <button
      type="button"
      onClick={() => {
        const newCookies = cookies.notes.concat([
          {
            id: uuid(),
            content: JSON.stringify(
              convertToRaw(
                ContentState.createFromText(
                  'New note... \nType something here...',
                ),
              ),
            ),
          },
        ]);

        setCookies('notes', newCookies);
      }}
      className={styles.fixedButton}
    >
      Create new note!
    </button>
  </div>
);

export default NotesPage;
