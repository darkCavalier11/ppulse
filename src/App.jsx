import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details";

import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/:id" component={Details}></Route>
                <Route exact path="/" component={Home}></Route>
              </Switch>
            </AnimatePresence>
          )}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
