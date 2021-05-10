import React from 'react';
import styles from './TitleBar.module.scss';

const TitleBar = () => (
  <div className={styles.header}>
    <h1>
      <span role="img" aria-label="notebook">
        📝
      </span>
      notes
    </h1>
  </div>
);

export default TitleBar;
