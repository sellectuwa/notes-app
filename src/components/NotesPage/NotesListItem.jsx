import React from 'react';
import { ImBin } from 'react-icons/im';
import { convertFromRaw } from 'draft-js';
import styles from './NotesListItem.module.scss';

const getTitle = (title) => {
  if (title === undefined) {
    return null;
  }
  if (title.trim().replace(/\s\s+/g, ' ') === '') {
    return <span>&#8196;</span>;
  }
  if (title.trim().replace(/\s\s+/g, ' ').length >= 15) {
    return `${title.substring(0, 14)}...`;
  }
  return title;
};

const getDesc = (content) => {
  const text = convertFromRaw(JSON.parse(content))
    .getPlainText()
    .trim()
    .replace(/\s\s+/g, ' ');

  if (text === '') {
    return 'Type something...';
  }
  if (text.length >= 18) {
    return `${text.substring(0, 17)}...`;
  }
  return text;
};

const NotesListItem = ({ id, title, content, notes, activeNote, setData }) => (
  <div
    role="button"
    tabIndex="0"
    className={
      id === activeNote ? `${styles.active} ${styles.item}` : `${styles.item}`
    }
    onClick={(e) => {
      if (e.target.tagName.toLowerCase() !== 'button') {
        setData('activeNote', id);
      }
    }}
    onKeyDown={(e) => {
      if (e.target.tagName.toLowerCase() !== 'button') {
        setData('activeNote', id);
      }
    }}
  >
    <div className={styles.info}>
      <p className={styles.title}>{getTitle(title)}</p>
      <p className={styles.desc}>{getDesc(content)}</p>
    </div>
    <button
      type="button"
      className={styles.removeButton}
      onClick={() => {
        const newCookies = notes.filter((obj) => obj.id !== id);
        if (newCookies.length !== 0 && activeNote === id) {
          setData('activeNote', newCookies[0].id);
        }
        setData('notes', newCookies);
      }}
    >
      <ImBin />
    </button>
  </div>
);

export default NotesListItem;
