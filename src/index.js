import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./Views/HomePage";
import SignInUser from './Views/SignInUser'
import Registration from "./Views/Register";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signInUser" element={<SignInUser />} />
      <Route path="/registerNewUser" element={<Registration/>}/>
    </Routes>
  </BrowserRouter>
);
