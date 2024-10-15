import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from '~/Pages/Dashboard';
import DefaultLayout from '~/Layouts/DefaultLayout';
import PaymentMethod from '~/Pages/PaymentMethod';
import Order from '~/Pages/Order';
import Product from '~/Pages/Product';
import Promotion from '~/Pages/Promotion';
import Login from './Components/auth/LoginForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
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
                    <Route path="/orders" element={<Order />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/promotions" element={<Promotion />} />
                </Route>
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
