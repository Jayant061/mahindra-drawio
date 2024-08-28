import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayGround from "./pages/Playground/PlayGround";
import Home from "./pages/Home/Home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/playground" element={<PlayGround />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
