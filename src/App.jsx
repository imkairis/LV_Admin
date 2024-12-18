import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';

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
import OrderDetail from './Pages/OrderDetail';
import UpdateProductPage from './Pages/UpdateProductPage';
import AdoptPage from './Pages/Adopt';
import AdoptDetail from './Pages/AdoptDetail';
import { configTheme } from '~/lib/theme';
import UsersPage from './Pages/Users';

function App() {
    const { token, user } = useSelector((state) => state.auth);
    const { isDarkMode } = useSelector((state) => state.theme);
    const isLogin = useMemo(() => !!token, [token]);
    const isAdmin = useMemo(() => user?.isAdmin, [user]);
    const config = configTheme(isDarkMode);

    return (
        <ConfigProvider theme={config}>
            <div className="dark:text-white">
                <Toaster position="top-center" reverseOrder={false} />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectRoute isAllow={isAdmin && isLogin} />
                            }
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
                                <Route
                                    path={ROUTES.ORDER}
                                    element={<Order />}
                                />
                                <Route
                                    path={ROUTES.ORDER_DETAIL}
                                    element={<OrderDetail />}
                                />
                                <Route path="/products" element={<Product />} />
                                <Route
                                    path="/promotions"
                                    element={<Promotion />}
                                />
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
                                <Route
                                    path={ROUTES.UPDATE_PRODUCT}
                                    element={<UpdateProductPage />}
                                />
                                <Route
                                    path={ROUTES.ADOPT}
                                    element={<AdoptPage />}
                                />
                                <Route
                                    path={ROUTES.ADOPT_DETAIL}
                                    element={<AdoptDetail />}
                                />
                                <Route
                                    path={ROUTES.USERS}
                                    element={<UsersPage />}
                                />
                            </Route>
                        </Route>
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}

export default App;
