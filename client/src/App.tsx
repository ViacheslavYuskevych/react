import { useEffect } from 'react';
import Header from './layouts/Header';
import Main from './layouts/Main';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    console.log('!!!!!!!!! App useEffect');
  }, []);

  return (
    <>
      <Header></Header>
      <Main></Main>
    </>
  );
}

export default App;
