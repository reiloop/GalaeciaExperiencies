import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import ListExperiences from "./components/ListExperiences";
import { TokenContextProvider } from "./components/TokenContextProvider";
import ExperiencePage from "./pages/ExperiencePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InicioPage from "./pages/InicioPage";
import AdminPage from "./pages/AdminPage";
import ActivationPage from "./pages/ActivationPage";
import SearchPage from "./pages/SearchPage";
import UserProfilePage from "./pages/UserProfilePage";

//import ActividadesPage from "./pages/ActividadesPage";
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin

function App() {
  return (
    <div className="App">
      <Router>
        <TokenContextProvider>
          <Switch>
            <Route exact path="/">
              <InicioPage />
            </Route>
            <Route exact path="/activate/:registrationCode">
              <ActivationPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/experiences">
              <SearchPage />
            </Route>
            <Route exact path="/experience/:postId">
              <ExperiencePage></ExperiencePage>
            </Route>
            <Route exact path="/create">
              <AdminPage></AdminPage>
            </Route>
            <Route exact path="/user/:userId">
              <UserProfilePage />
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
