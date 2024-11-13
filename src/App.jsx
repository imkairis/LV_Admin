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
import AgeGroup from '~/Pages/AgeGroup';
import TargetAudience from '~/Pages/TargetAudience';
import ProductDetail from '~/Pages/ProductDetail';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import OrderDetail from './Pages/OrderDetail';

function App() {
    const { token, user } = useSelector((state) => state.auth);
    const isLogin = useMemo(() => !!token, [token]);
    const isAdmin = useMemo(() => user?.isAdmin, [user]);
    const isDevelopment = import.meta.env.NODE_ENV === 'development';

    return (
        <>
            {/* {isDevelopment && <ReactQueryDevtools initialIsOpen />} */}
            <ReactQueryDevtools initialIsOpen />
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={<ProtectRoute isAllow={isAdmin && isLogin} />}
                    >
                        <Route path="/" element={<DefaultLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route
                                path="/category/payment-method"
                                element={<PaymentMethod />}
                            />
                            <Route
                                path="/category/payment-method/:id"
                                element={<PaymentMethod />}
                            />
                            <Route path={ROUTES.ORDER} element={<Order />} />
                            <Route
                                path={ROUTES.ORDER_DETAIL}
                                element={<OrderDetail />}
                            />
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
                            <Route
                                path={ROUTES.AGE_GROUP}
                                element={<AgeGroup />}
                            />
                            <Route
                                path={ROUTES.TARGET_AUDIENCE}
                                element={<TargetAudience />}
                            />
                            <Route
                                path={ROUTES.PRODUCT_DETAIL}
                                element={<ProductDetail />}
                            />
                        </Route>
                    </Route>
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
