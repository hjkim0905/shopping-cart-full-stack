import Cart from "./pages/Cart";
import ConfirmOrder from "./pages/ConfirmOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/shopping-cart-full-stack">
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
