import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  userId: string;
  id: number;
  title: string;
  content: string;
}

export function useGetPost(id?: string) {
  const [post, setPost] = useState<Post>();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        const data = response.data;
        const formattedPost = {
          userId: data.userId,
          id: data.id,
          title: data.title,
          content: data.body,
        };
        setPost(formattedPost);
        setErrorStatus(null);
      })
      .catch((error) => {
        setPost(undefined);
        if (error.response?.status === 404) {
          setErrorStatus(404);
        } else {
          setErrorStatus(error.response?.status || 500);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { post, errorStatus, loading };
}

export function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/posts')
      .then((response) => {
        const data = response.data;
        const formattedPosts = data.map((post: any) => ({
          userId: post.userId,
          id: post.id,
          title: post.title,
          content: post.body,
        }));
        setPosts(formattedPosts);
        setErrorStatus(null);
      })
      .catch((error) => {
        setPosts([]);
        if (error.response?.status === 404) {
          setErrorStatus(404);
        } else {
          setErrorStatus(error.response?.status || 500);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, errorStatus, loading };
}