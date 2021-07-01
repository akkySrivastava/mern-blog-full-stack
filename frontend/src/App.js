import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogAdmin from "./Screens/BlogAdmin";
import Blogs from "./Screens/Blogs";
import SingleBlog from "./Screens/SingleBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/" component={Blogs} />
            <Route exact={true} path="/blogadmin" component={BlogAdmin} />
            <Route path="/blog/:blogID" component={SingleBlog} exact={true} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
