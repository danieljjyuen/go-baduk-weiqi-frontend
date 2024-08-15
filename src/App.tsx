import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/graphql"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Login from "./components/Login";
import RegisterPlayer from "./components/RegisterPlayer";
import { Provider } from "react-redux";
import store from "./store/store";

const App: React.FC = () => {

  return(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/room/:roomId/game/:gameId" element={<GamePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPlayer />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};

export default App;