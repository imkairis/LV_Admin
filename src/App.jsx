import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import DashboardPage from '~/Pages/Dashboard';
import DefaultLayout from '~/Layouts/DefaultLayout';
import PaymentMethod from '~/Pages/PaymentMethod';
import Order from '~/Pages/Order';
import Product from '~/Pages/Product';
import Promotion from '~/Pages/Promotion';
import Login from '~/Pages/auth/LoginForm';
import ProtectRoute from '~/Components/ProtectRoute';
import { ROUTES } from '~/Constants';
import AddProductPage from '~/Pages/AddProduct';
import ProductType from '~/Pages/ProductType';

function App() {
    return (
        <>
            <ReactQueryDevtools initialIsOpen />
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectRoute>
                                <DefaultLayout />
                            </ProtectRoute>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                        <Route
                            path="/category/payment-method"
                            element={<PaymentMethod />}
                        />
                        <Route
                            path="/category/payment-method/:id"
                            element={<PaymentMethod />}
                        />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/promotions" element={<Promotion />} />
                        <Route
                            path={ROUTES.PRODUCT_TYPE}
                            element={<ProductType />}
                        />
                        <Route
                            path={ROUTES.ADD_PRODUCT}
                            element={<AddProductPage />}
                        />
                    </Route>
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
