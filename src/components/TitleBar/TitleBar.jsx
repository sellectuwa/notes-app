import React from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import styles from './TitleBar.module.scss';
import Modal from '../Modal';

const TitleBar = ({ notes, activeNote }) => (
  <div className={styles.header}>
    <Modal>
      <ReactNotification />
    </Modal>
    <h1>
      <span role="img" aria-label="notebook">
        📝
      </span>
      notes
    </h1>
    <div className={styles.button}>
      {JSON.stringify(notes) !== '[]' ? (
        <button
          type="button"
          onClick={() => {
            const copyObject = { notes, activeNote };
            navigator.clipboard
              .writeText(JSON.stringify(copyObject, null, 2))
              .then(() => {
                store.addNotification({
                  title: 'Success!',
                  message: 'Data copied to the clipboard.',
                  type: 'success',
                  insert: 'bottom',
                  container: 'bottom-left',
                  animationIn: ['animate__animated', 'animate__fadeIn'],
                  animationOut: ['animate__animated', 'animate__fadeOut'],
                  dismiss: {
                    duration: 3000,
                  },
                });
              });
          }}
        >
          Get JSON
        </button>
      ) : (
        ''
      )}
    </div>
  </div>
);

export default TitleBar;
