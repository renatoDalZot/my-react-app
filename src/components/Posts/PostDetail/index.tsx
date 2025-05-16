import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetPost } from '../../../services/usePostsHooks';


interface Post {
    userId: string;
    id: number;
    title: string;
    content: string;
    }



function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { post, errorStatus, loading } = useGetPost(id);

  if (loading) return <div>Carregando...</div>;
  if (!post) {
    if (errorStatus === 404) {
      return <div>Post não encontrado (erro 404)</div>;
    } else {
      return <div>Erro ao carregar o post</div>;
    }
  }

  return (
    <div>
      <h1>
        Post Detail{' '}
        <a href={`/posts/edit/${id}`} style={{ fontSize: '16px', marginLeft: '16px' }}>
          editar post
        </a>
      </h1>
      <p>ID do post: {id}</p>
      <p>Título do post: {post?.title}</p>
      <p>Conteúdo do post: {post?.content}</p>
    </div>
  );
}

export default PostDetail;