import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetPosts } from "../../../services/usePostsHooks";

interface Post {
  id: number;
  title: string;
  content: string;
}

function PostList() {
  const { posts, errorStatus, loading } = useGetPosts();
  const navigate = useNavigate();
  function navegarParaPost(id: number) {      
    navigate(`/posts/${id}`);
  }

  if (loading) return <div>Carregando...</div>;
  if (errorStatus) {
    return <div>Erro ao carregar os posts</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>Nenhum post encontrado</div>;
  }  
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Posts Recentes</h2>
        <a href="/posts/create" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
          Novo Post
        </a>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "10px",
        }}
      >
        {posts.map((post) => (
          <div key={post.id} onClick={() => navegarParaPost(post.id)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;