import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlayGround from "./pages/Playground/PlayGround";

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
