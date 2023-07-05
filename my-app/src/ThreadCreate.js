import React, { useState } from 'react';

const ThreadCreate = ({ setIsCreatingThread, fetchThreads }) => {
  const [title, setTitle] = useState('');

  const createThread = async (event) => {
    event.preventDefault();

    const threadData = { title };

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
      setIsCreatingThread(false);
      fetchThreads();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  const handleCancel = () => {
    setIsCreatingThread(false);
  };

  return (
    <div>
      <h2>新規スレッド作成</h2>
      <form onSubmit={createThread}>
        <label>
          タイトル:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <button type="submit">作成</button>
        <button type="button" onClick={handleCancel}>
          キャンセル
        </button>
      </form>
    </div>
  );
};

export default ThreadCreate;
