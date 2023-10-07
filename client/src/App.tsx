import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewPaints from "./ViewPaints";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewPaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
