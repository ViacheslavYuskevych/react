import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import TodoPage from '../pages/TodoPage';
import styles from '../styles/main.module.css';
import AuthPage from '../auth/AuthPage';

function Main() {
  const isAuth = localStorage.getItem('token');

  return (
    <main className={styles.main}>
      <Router>
        <Routes>
          <Route
            path='/'
            element={isAuth ? <TodoPage /> : <Navigate to='/auth' />}
          />
          <Route
            path='/auth'
            element={isAuth ? <Navigate to='/' /> : <AuthPage />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </main>
  );
}

export default Main;
