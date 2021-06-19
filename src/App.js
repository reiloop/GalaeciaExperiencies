import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm.js";
import ListExperiences from "./components/ListExperiences";
//import { TokenContextProvider } from "./components/TokenContextProvider";
//import Activation from "./components/Activation";
import LoginForm from "./components/LoginForm";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register">
            <RegisterForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/experiences">
            <ListExperiences />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
