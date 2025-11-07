import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomeBack from "./components/WelcomeBack";
import Dashboard from "./components/Dashboard";
import Wallets from "./components/Wallets";
import WalletDetail from "./components/WalletDetail";
import Customers from "./components/Customers";
import CustomerDetail from "./components/CustomerDetail";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<WelcomeBack />} />

        {/* Authenticated Routes with Layout */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/wallets/:id" element={<WalletDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
