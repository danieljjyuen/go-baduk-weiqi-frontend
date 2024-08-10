import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/GamePage";

const App: React.FC = () => {
  return(
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room/:roomId/game/:gameId" element={<GamePage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;