import React, { useState } from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { v4 as uuid } from 'uuid';
import ReactNotification, { store } from 'react-notifications-component';
import styles from './WelcomePage.module.scss';
import Modal from '../Modal';

const WelcomePage = ({ setData }) => {
  const [textJSON, setTextJSON] = useState('');
  const [modalJSON, setModalJSON] = useState(false);

  return (
    <div className={styles.welcome}>
      {modalJSON === true ? (
        <Modal>
          <ReactNotification />
          <div
            id="modal"
            className={`${styles.modal} animate__animated animate__fadeIn`}
          >
            <div className={styles.modalContent}>
              <h1>Import JSON</h1>
              <textarea
                value={textJSON}
                onChange={(e) => setTextJSON(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  className={styles.import}
                  onClick={() => {
                    let isValid = true;

                    try {
                      JSON.parse(textJSON);
                    } catch (e) {
                      isValid = false;
                    }

                    if (isValid) {
                      setModalJSON(false);
                      setData('json', textJSON);
                    } else {
                      store.addNotification({
                        title: 'Error!',
                        message: "JSON isn't valid.",
                        type: 'danger',
                        insert: 'bottom',
                        container: 'bottom-left',
                        animationIn: ['animate__animated', 'animate__fadeIn'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        dismiss: {
                          duration: 3000,
                        },
                      });
                    }
                  }}
                >
                  Import
                </button>
                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => {
                    setModalJSON(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
      <h1>Welcome!</h1>
      <h3>You dont have any notes yet.</h3>
      <button
        type="button"
        onClick={() => {
          const id = uuid();

          setData('activeNote', id);
          setData('notes', [
            {
              id,
              title: 'New note',
              content: JSON.stringify(
                convertToRaw(ContentState.createFromText('')),
              ),
            },
          ]);
        }}
      >
        Create new note!
      </button>
      <button type="button" onClick={() => setModalJSON(true)}>
        Import JSON
      </button>
    </div>
  );
};

export default WelcomePage;
