import Cart from "./pages/Cart";
import OrderConfirm from "./pages/OrderConfirm";
// import ConfirmPayment from "./pages/ConfirmPayment";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/order" element={<OrderConfirm />} />
        {/* 결제 확인 페이지는 마지막 단계라 라우터 연결을 임시로 끊어둠 */}
        {/* <Route path="/confirm" element={<ConfirmPayment />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
