import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from "./pages/customers";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/customers" component={Customers} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
