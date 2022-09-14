import Modal from 'react-modal';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Players from './screens/Players';

function App() {
  Modal.setAppElement('#root');
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Players />} />
      </Routes>
    </>
  );
};

export default App;
