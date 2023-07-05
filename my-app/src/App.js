import React, { useState, useEffect } from 'react';
import ThreadList from './ThreadList';
import ThreadCreate from './ThreadCreate';
import ThreadPosts from './ThreadPosts';

const App = () => {
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [threads, setThreads] = useState([]);

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

  const handleCreateThread = () => {
    setIsCreatingThread(true);
  };

  const handleBackToThreadList = () => {
    setSelectedThreadId('');
  };

  const getSelectedThreadTitle = () => {
    const selectedThread = threads.find((thread) => thread.id === selectedThreadId);
    return selectedThread ? selectedThread.title : '';
  };

  return (
    <div>
      {isCreatingThread ? (
        <ThreadCreate setIsCreatingThread={setIsCreatingThread} fetchThreads={fetchThreads} />
      ) : (
        <div>
          {!selectedThreadId ? (
            <ThreadList setSelectedThreadId={setSelectedThreadId} handleCreateThread={handleCreateThread} threads={threads} />
          ) : (
            <ThreadPosts
              selectedThreadId={selectedThreadId}
              handleBackToThreadList={handleBackToThreadList}
              selectedThreadTitle={getSelectedThreadTitle()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
