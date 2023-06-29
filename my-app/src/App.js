import React, { useState } from 'react';
import './App.css';
import ThreadListScreen from './ThreadListScreen';
import ThreadFormScreen from './ThreadFormScreen';

function App() {
  const [showThreadForm, setShowThreadForm] = useState(false);

  const toggleThreadForm = () => {
    setShowThreadForm(!showThreadForm);
  };

  return (
    <div>
      {showThreadForm ? (
        <ThreadFormScreen toggleThreadForm={toggleThreadForm} />
      ) : (
        <ThreadListScreen toggleThreadForm={toggleThreadForm} />
      )}
    </div>
  );
}

export default App;
