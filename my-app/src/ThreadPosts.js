import React, { useState, useEffect } from 'react';

const ThreadPosts = ({ selectedThreadId, handleBackToThreadList, selectedThreadTitle }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (selectedThreadId) {
          const response = await fetch(
            `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${selectedThreadId}/posts?offset=0`
          );
          const data = await response.json();
          console.log('Fetched posts:', data);
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [selectedThreadId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    const postData = { post: message };

    try {
      const response = await fetch(
        `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${selectedThreadId}/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );
      const data = await response.json();
      console.log('New post created:', data);
      setMessage('');

      // Refresh the post list to reflect the new post
      const updatedResponse = await fetch(
        `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${selectedThreadId}/posts?offset=0`
      );
      const updatedData = await updatedResponse.json();
      setPosts(updatedData.posts);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted message:', message);
    sendMessage(event);
    setMessage('');
  };

  return (
    <div>
      <h2>{selectedThreadTitle}</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>

      <h2>メッセージ送信フォーム</h2>
      <form onSubmit={handleSubmit}>
        <label>
          メッセージ:
          <textarea value={message} onChange={handleChange} name="content" />
        </label>
        <br />
        <button type="submit">送信</button>
      </form>
      <button onClick={handleBackToThreadList}>スレッド一覧に戻る</button>
    </div>
  );
};

export default ThreadPosts;
