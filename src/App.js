import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout></AppLayout>}>
        <Route index element={<Homepage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductDetailPage />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminLayout ></AdminLayout>}></Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App;
