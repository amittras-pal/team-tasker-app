import { Route, Routes } from "react-router-dom";
import Login from "./modules/Login/Login";
import Register from "./modules/Register/Register";
import ResetPassword from "./modules/ResetPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
