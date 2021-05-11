import React from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { v4 as uuid } from 'uuid';
import styles from './WelcomePage.module.scss';

const WelcomePage = ({ setCookies }) => (
  <div className={styles.welcome}>
    <h1>Welcome!</h1>
    <h3>You dont have any notes yet.</h3>
    <button
      type="button"
      onClick={() => {
        const id = uuid();

        setCookies('activeNote', id);
        setCookies('notes', [
          {
            id,
            content: JSON.stringify(
              convertToRaw(
                ContentState.createFromText(
                  'New note... \nType something here...',
                ),
              ),
            ),
          },
        ]);
      }}
    >
      Create new note!
    </button>
  </div>
);

export default WelcomePage;
