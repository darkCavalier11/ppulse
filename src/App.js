import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route
          render={({ location }) => (
            <Switch location={location} key={location.pathname}>
              <Route exact path="/:id" component={Details}></Route>
              <Route exact path="/" component={Home}></Route>
            </Switch>
          )}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
