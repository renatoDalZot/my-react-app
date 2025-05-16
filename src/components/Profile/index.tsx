import { useUser } from '../../contexts/UserContext';

function Profile() {
  const { user, setUser } = useUser();

  return (
    <div>
      {user ? (
        <p>Bem-vindo, {user.name}!</p>
      ) : (
        <button onClick={() => setUser({ name: 'Renato', email: 'renato@email.com' })}>
          Fazer login
        </button>
      )}
    </div>
  );
}

export default Profile;