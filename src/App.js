import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm.js";
import ListExperiences from "./components/ListExperiences";
import { TokenContextProvider } from "./components/TokenContextProvider";

import LoginForm from "./components/LoginForm";
//import Activation from "./components/Activation";
import Activity from "./pages/ExperiencePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <div className="App">
      <Router>
        <TokenContextProvider>
          <Switch>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/experiences">
              <ListExperiences />
            </Route>
            <Route exact path="/experience/:id">
              <Activity></Activity>
            </Route>
          </Switch>
        </TokenContextProvider>
      </Router>
    </div>
  );
}

export default App;
