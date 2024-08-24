  import React from "react";
  import { Route, Routes } from "react-router-dom";
  import Home from "./pages/Home";
  import GamePage from "./pages/GamePage";
  import Login from "./components/Login";
  import RegisterPlayer from "./components/RegisterPlayer";
  import NavBar from "./components/NavBar";

  const App: React.FC = () => {

    return(
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room/:roomId" element={<GamePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPlayer />} />
        </Routes>
      </div>

    );
  };

  export default App;