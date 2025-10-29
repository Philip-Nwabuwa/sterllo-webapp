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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<WelcomeBack />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/wallets/:id" element={<WalletDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
