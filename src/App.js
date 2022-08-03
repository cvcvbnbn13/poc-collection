import { usePocCollection } from './context/toolProvider';
import { MainPage } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <MainPage />
    </div>
  );
}

export default App;
