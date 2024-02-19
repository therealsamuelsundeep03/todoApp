import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./views/Todo/Todo";
import Login from "./views/Login/Login";
import SignIn from "./views/Signin/Signin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
