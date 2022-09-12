import { Route, Routes } from 'react-router-dom';

import Players from './screens/Players';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Players />} />
    </Routes>
  );
};

export default App;
