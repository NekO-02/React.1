import React, { useState } from 'react';

const CreateThreadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const threadData = { title, content };

    try {
      const response = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(threadData),
      });
      const data = await response.json();
      console.log('New thread created:', data);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        タイトル:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        内容:
        <textarea value={content} onChange={(event) => setContent(event.target.value)} />
      </label>
      <br />
      <button type="submit">作成</button>
    </form>
  );
};

export default CreateThreadForm;
