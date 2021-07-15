import "./styles.scss";

import { Route, Switch } from "react-router-dom";
import Table from "./components/Table";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/search" component={Table} />
      </Switch>
    </div>
  );
}

export default App;
