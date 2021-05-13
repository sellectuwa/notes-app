import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import styles from './NotesEditor.module.scss';

const NotesEditor = ({ notes, activeNote, setData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());

  const onChange = (st) => {
    const index = notes.findIndex((x) => x.id === activeNote);
    if (index !== -1) {
      setData('notes', [
        ...notes.slice(0, index),
        {
          ...notes[index],
          content: JSON.stringify(convertToRaw(st.getCurrentContent())),
        },
        ...notes.slice(index + 1),
      ]);
    }

    setContent(st);
  };

  useEffect(() => {
    setTitle(notes.find((e) => e.id === activeNote).title);
    setContent(
      EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(notes.find((e) => e.id === activeNote).content),
        ),
      ),
    );
  }, [activeNote]);

  return (
    <div className={styles.editor}>
      <input
        maxLength="30"
        className={styles.title}
        type="text"
        value={title}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            setContent(EditorState.moveFocusToEnd(content));
          }
        }}
        onChange={(e) => {
          const index = notes.findIndex((x) => x.id === activeNote);
          if (index !== -1) {
            setData('notes', [
              ...notes.slice(0, index),
              {
                ...notes[index],
                title: e.target.value,
              },
              ...notes.slice(index + 1),
            ]);
          }

          setTitle(e.target.value);
        }}
      />
      <Editor
        placeholder="Type something here..."
        editorState={content}
        handleKeyCommand={(command, st) => {
          const newState = RichUtils.handleKeyCommand(st, command);

          if (newState) {
            onChange(newState);
            return 'handled';
          }

          return 'not-handled';
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default NotesEditor;
