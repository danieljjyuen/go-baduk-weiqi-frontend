  import React, { useEffect } from "react";
  import { Route, Routes, useNavigate } from "react-router-dom";
  import Home from "./pages/Home";
  import GamePage from "./pages/GamePage";
  import Login from "./components/Login";
  import RegisterPlayer from "./components/RegisterPlayer";
  import NavBar from "./components/NavBar";
  import { useDispatch } from "react-redux";
  import { setPlayerDetails, setOnlineStatus } from "./store/playerSlice";


  const App: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const storedPlayer = JSON.parse(localStorage.getItem("player") || "{}");
      if(storedPlayer?.username) {
        dispatch(setPlayerDetails({
          playerId: storedPlayer.playerId,
          username: storedPlayer.username,
      }));
      dispatch(setOnlineStatus(true));
      }
    },[dispatch, navigate])

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