import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import styles from './NotesEditor.module.scss';

const NotesEditor = ({ cookies, setCookies }) => {
  const [content, setContent] = useState(EditorState.createEmpty());

  const onChange = (st) => {
    const index = cookies.notes.findIndex((x) => x.id === cookies.activeNote);
    if (index !== -1) {
      setCookies('notes', [
        ...cookies.notes.slice(0, index),
        {
          ...cookies.notes[index],
          content: JSON.stringify(convertToRaw(st.getCurrentContent())),
        },
        ...cookies.notes.slice(index + 1),
      ]);
    }

    setContent(st);
  };

  useEffect(() => {
    setContent(
      EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(
            cookies.notes.find((e) => e.id === cookies.activeNote).content,
          ),
        ),
      ),
    );
  }, [cookies.activeNote]);

  return (
    <div className={styles.editor}>
      <div>
        <button
          type="button"
          onClick={() => {
            onChange(RichUtils.toggleInlineStyle(content, 'BOLD'));
          }}
        >
          B
        </button>
      </div>
      <Editor
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
