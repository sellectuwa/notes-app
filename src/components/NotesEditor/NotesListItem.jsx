import React from 'react';

const NotesListItem = ({ id, title, content, cookies, setCookies }) => (
  <div>
    <h3>{title}</h3>
    <h5>{content}</h5>
    <button
      type="button"
      onClick={() => {
        const newCookies = cookies.notes.filter((obj) => obj.id !== id);
        setCookies('notes', newCookies);
      }}
    >
      Remove
    </button>
  </div>
);

export default NotesListItem;
