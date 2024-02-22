import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Redirect } from "./components/Redirect";

export default function App() {
  return (
    <Router>
      <div className="bg-[#0E1117] min-h-[100dvh]">
        <Routes>
          <Route element={<Header />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/s/:slug" element={<Redirect />} />
        </Routes>
      </div>
    </Router>
  );
}
