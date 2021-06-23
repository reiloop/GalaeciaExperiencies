import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListExperiences from "./components/ListExperiences";
import { TokenContextProvider } from "./components/TokenContextProvider";
import ExperiencePage from "./pages/ExperiencePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Activation from "./components/Activation";
import InicioPage from "./pages/InicioPage";
import AdminPage from "./pages/AdminPage";

//import ActividadesPage from "./pages/ActividadesPage";

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
              <Activation />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/experiences">
              <ListExperiences />
            </Route>
            <Route exact path="/experience/:postId">
              <ExperiencePage></ExperiencePage>
            </Route>
            <Route exact path="/create">
              <AdminPage></AdminPage>
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
