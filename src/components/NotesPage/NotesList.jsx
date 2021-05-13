import React from 'react';
import styles from './NotesList.module.scss';
import NotesListItem from './NotesListItem';

const NotesList = ({ notes, activeNote, setData }) => (
  <div className={styles.notes}>
    {notes.map((obj) => (
      <NotesListItem
        key={obj.id}
        id={obj.id}
        title={obj.title}
        content={obj.content}
        notes={notes}
        activeNote={activeNote}
        setData={setData}
      />
    ))}
  </div>
);

export default NotesList;
