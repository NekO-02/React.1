import React, { useState } from 'react';

async function createThread(newThreadTitle) {
  try {
    const response = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newThreadTitle })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

function ThreadFormScreen({ toggleThreadForm }) {
  const [newThreadTitle, setNewThreadTitle] = useState('');

  const handleCreateThread = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newThread = await createThread(newThreadTitle);
      setNewThreadTitle('');
      toggleThreadForm(); // スレッド一覧画面に戻る
    } catch (error) {
      // Handle error, if needed
    }
  };

  return (
    <div>
      <h2>スレッド作成</h2>
      <input
        type="text"
        value={newThreadTitle}
        onChange={e => setNewThreadTitle(e.target.value)}
      />
      <button onClick={handleCreateThread}>投稿</button>
    </div>
  );
}

export default ThreadFormScreen;
