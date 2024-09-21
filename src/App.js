import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./common/component/common.style.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AdminProduct from "./pages/AdminPages/AdminProduct";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import OrderCompletePage from "./pages/PaymentPage/OrderCompletePage";
import MyPage from "./pages/MyPage/MyPage";
import AdminOrderPage from "./pages/AdminPages/AdminOrderPage";
import AdminCouponPage from "./pages/AdminPages/AdminCouponPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout></AppLayout>}>
        <Route index element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product">
          <Route index element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/payment">
          <Route index element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />
        </Route>
        <Route path="/my/purchase" element={<MyPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminProduct />}></Route>
        <Route path="/admin/product" element={<AdminProduct />}></Route>
        <Route path="/admin/order" element={<AdminOrderPage />}></Route>
        <Route path="/admin/coupon" element={<AdminCouponPage />}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App;
