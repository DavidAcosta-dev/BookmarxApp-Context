import React from 'react';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <button onClick={() => {props.history.push("/")}}>
        Bookmark List
      </button>
      {' '}
      <button onClick={() => {props.history.push("/add-bookmark")}}>
        Add Bookmark
      </button>
    </nav>
  );
}
