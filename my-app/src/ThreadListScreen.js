import React, { useState, useEffect } from 'react';

async function fetchThreads() {
  try {
    const response = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=0');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw error;
  }
}

function ThreadListScreen({ toggleThreadForm }) {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        const data = await fetchThreads();
        setThreads(data);
      } catch (error) {
        // Handle error, if needed
      }
    };

    fetchThreadData();
  }, []);

  return (
    <div>
      <h1>スレッド一覧</h1>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
      <button onClick={toggleThreadForm}>スレッド作成</button>
    </div>
  );
}

export default ThreadListScreen;
