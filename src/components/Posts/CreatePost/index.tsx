import React, { useState } from 'react';

interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
}

function PostDetail() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    
    const response = await fetch('http://localhost:3001/posts');
    const posts: Post[] = await response.json();
    const lastId = posts.length > 0 ? Math.max(...posts.map(p => Number(p.id))) : 0;
    const id = lastId + 1;

    
    const newPost: Post = {
      userId: id,
      id: id.toString(),
      title: title,
      body: body
    };

   
    const postResponse = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    if (postResponse.ok) {
      setStatus('Post criado com sucesso!');
      setTitle('');
      setBody('');
    } else {
      setStatus('Erro ao criar o post.');
    }
  }

  return (
    <div>
      <h1>Criar Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Post</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default PostDetail;