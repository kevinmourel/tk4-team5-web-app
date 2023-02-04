import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';

import Home from './pages/Home';

function App() {
  return (
    <>
    <Routes>
        <Route exact path="/" element={ <Home/> } />
     </Routes>
     </>
  );
}

export default App;
