import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Login from "./components/Login";

const App: React.FC = () => {

  return(
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room/:roomId/game/:gameId" element={<GamePage />} />
          <Route path="/login" elmement={<Login />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;