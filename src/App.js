import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogAdmin from "./Screens/BlogAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/blogadmin" component={BlogAdmin} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
