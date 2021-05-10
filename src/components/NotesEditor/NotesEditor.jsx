import React from 'react';
import { v4 as uuid } from 'uuid';
import styles from './NotesEditor.module.scss';
import NotesListItem from './NotesListItem';

const NotesEditor = ({ cookies, setCookies }) => (
  <div>
    <div className={styles.container}>
      <div className={styles.notes}>
        {cookies.notes.map((obj) => (
          <NotesListItem
            key={obj.id}
            id={obj.id}
            title={obj.title}
            content={obj.content}
            cookies={cookies}
            setCookies={setCookies}
          />
        ))}
      </div>
      <div className={styles.editor} />
    </div>
    <button
      type="button"
      onClick={() => {
        const newCookies = cookies.notes.concat([
          {
            id: uuid(),
            title: 'New note',
            content: 'Type text here....',
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

export default NotesEditor;
