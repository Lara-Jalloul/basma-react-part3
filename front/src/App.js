import "./App.css";
import Routers from "./components/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
