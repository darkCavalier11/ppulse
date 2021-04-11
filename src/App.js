import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [{ msg }, dispatch] = useStateValue();
  return (
    <div className="app">
      <Router>
        <Header />
        <Route
          render={({ location }) => (
            <Switch location={location} key={location.pathname}>
              <Route
                exact
                path="/"
              ></Route>

            </Switch>
          )}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
