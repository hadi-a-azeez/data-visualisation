import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from "./pages/customers";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
