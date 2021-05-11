import React from 'react';
import styles from './NotesList.module.scss';
import NotesListItem from './NotesListItem';

const NotesList = ({ cookies, setCookies }) => (
  <div className={styles.notes}>
    {cookies.notes.map((obj) => (
      <NotesListItem
        key={obj.id}
        id={obj.id}
        content={obj.content}
        cookies={cookies}
        setCookies={setCookies}
      />
    ))}
  </div>
);

export default NotesList;
