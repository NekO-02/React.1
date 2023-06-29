import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

async function fetchThreadPosts(threadId) {
  try {
    const response = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching thread posts:', error);
    throw error;
  }
}

function ThreadPosts() {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const data = await fetchThreadPosts(threadId);
        setPosts(data);
      } catch (error) {
        // Handle error, if needed
      }
    };

    fetchPostsData();
  }, [threadId]);

  return (
    <div>
      <h1>スレッド投稿一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadPosts;
