import Cart from "./pages/Cart";
import ConfirmOrder from "./pages/ConfirmOrder";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
