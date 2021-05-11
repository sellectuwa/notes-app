import React from 'react';
import { convertFromRaw } from 'draft-js';
import styles from './NotesListItem.module.scss';

const contentToText = (content) =>
  convertFromRaw(JSON.parse(content)).getPlainText();

const desc = (content) => {
  const lines = content.split('\n');
  lines.splice(0, 1);
  return lines.join('\n');
};

const NotesListItem = ({ id, content, cookies, setCookies }) => (
  <div
    role="button"
    tabIndex="0"
    className={
      id === cookies.activeNote
        ? `${styles.active} ${styles.item}`
        : `${styles.item}`
    }
    onClick={(e) => {
      if (e.target.tagName.toLowerCase() !== 'button') {
        setCookies('activeNote', id);
      }
    }}
    onKeyDown={(e) => {
      if (e.target.tagName.toLowerCase() !== 'button') {
        setCookies('activeNote', id);
      }
    }}
  >
    <h3>{contentToText(content).split('\n')[0]}</h3>
    <h5>{desc(contentToText(content))}</h5>
    <button
      type="button"
      className=".removeButton"
      onClick={() => {
        const newCookies = cookies.notes.filter((obj) => obj.id !== id);
        if (newCookies.length !== 0 && cookies.activeNote === id) {
          setCookies('activeNote', newCookies[0].id);
        }
        setCookies('notes', newCookies);
      }}
    >
      Remove
    </button>
  </div>
);

export default NotesListItem;
