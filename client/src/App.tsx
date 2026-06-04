import Cart from './pages/Cart';
import ConfirmOrder from './pages/ConfirmOrder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/shopping-cart/confirm" element={<ConfirmOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
