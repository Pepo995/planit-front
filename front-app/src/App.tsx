import TextInput from "./components/TextInput";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Prueba from "./views/prueba";
import Register from "./views/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/prueba" element={<Prueba />} />
      </Routes>
    </>
  );
}

export default App;
