import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
    id: string;
    userId: number;
    title: string;
    body: string;
}

function EditPost() {
    const { id } = useParams<{ id: string }>(); 
    const [post, setPost] = useState<Post>();    

    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const formattedPost = {
                    id: data.id,
                    userId: data.userId,
                    title: data.title,
                    body: data.body,
                };
                setPost(formattedPost);
            })
            .catch((error) => console.error("Erro ao carregar o post:", error));
    }, []);

    if (!post) {
        return <div>Carregando...</div>;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const updatedPost = {
            ...post,
            title: post?.title,
            body: post?.body,
        };

        const response = await fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            alert('Post atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar o post.');
        }
    }

    
  return (
    <div>
      <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Título:</label>
            <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Conteúdo:</label>
            <textarea
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                required
            />
            </div>
            <button type="submit">Salvar</button>
        </form>
    </div>
  );
}

export default EditPost;