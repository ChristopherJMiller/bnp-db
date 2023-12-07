import { useContext, useMemo } from 'react';
import { AuthContext } from './components/AuthContext';
import { LoginForm } from './components/LoginForm';

function App() {
  const { userClaims } = useContext(AuthContext);

  const page = useMemo(() => {
    if (userClaims) {
      return <div>{userClaims.name}</div>
    } else {
      return <LoginForm />
    }
  }, [userClaims]);

  return (
    <div className="container mx-auto py-2">
      {page}
    </div>
  )
}

export default App
