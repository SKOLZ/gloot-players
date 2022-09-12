import { Route, Routes } from 'react-router-dom';

import Players from './screens/Players';

function App() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Players />} />
      </Routes>
    </main>
  );
};

export default App;
