import React from 'react';
import { v4 as uuid } from 'uuid';
import styles from './WelcomePage.module.scss';

const WelcomePage = ({ setCookies }) => (
  <div className={styles.welcome}>
    <h1>Welcome!</h1>
    <h3>You dont have any notes yet.</h3>
    <button
      type="button"
      onClick={() => {
        setCookies('notes', [
          { id: uuid(), title: 'New note', content: 'Type text here....' },
        ]);
      }}
    >
      Create new note!
    </button>
  </div>
);

export default WelcomePage;
