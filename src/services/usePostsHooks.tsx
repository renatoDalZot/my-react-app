import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { dbEntry, Post } from '../types/postInterfaces';

export function useGetPost(id?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      if (!response.ok) throw response;
      const post : dbEntry = await response.json();
      return {        
        id: Number(post.id),
        title: post.title,
        content: post.body,
      } as Post;
    },
  });
  return {
    post: data ?? null,
    errorStatus: error
      ? (error instanceof Response
          ? error.status
          : 500)
      : null,
    loading: isLoading,
  };
}

export function useGetPosts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/posts');
      if (!response.ok) throw response;
      const data = await response.json();
      return data.map((post: dbEntry) => ({
        userId: post.userId,
        id: post.id,
        title: post.title,
        content: post.body,
      })) as Post[];
    },
  });

  return {
    posts: data ?? [],
    errorStatus: error
      ? (error instanceof Response
          ? error.status
          : 500)
      : null,
    loading: isLoading,
  };
}