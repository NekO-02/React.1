import React, { useState, useEffect } from 'react';

const ThreadList = ({ setSelectedThreadId, handleCreateThread }) => {
  const [threads, setThreads] = useState([]);

  // スレッド一覧を取得
  const fetchThreads = async () => {
    try {
      const response = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=0');
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleThreadClick = (threadId) => {
    setSelectedThreadId(threadId);
  };

  return (
    <div>
      <h2>スレッド一覧</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id} onClick={() => handleThreadClick(thread.id)}>
            {thread.title}
          </li>
        ))}
      </ul>

      <button onClick={handleCreateThread}>スレッド作成</button>
    </div>
  );
};

export default ThreadList;
