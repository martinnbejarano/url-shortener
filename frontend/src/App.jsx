import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Redirect } from "./components/Redirect";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <div className="min-h-[100dvh] bg-[#0E1117]">
        <ToastContainer position="bottom-right" theme="dark" />
        <Routes>
          <Route element={<Header />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/s/:slug" element={<Redirect />} />
        </Routes>
      </div>
    </Router>
  );
}
