import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import './App.css';
import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';
import Banner from './components/Banner';
import Products from './components/Products';

function App() {
  return (
    <div>
      <Router>
      <span class="nav-link"><Link to="/banner">Banners</Link></span>
      <span class="nav-link"><Link to="/">AddTask</Link></span>
      <span class="nav-link"><Link to="/tasks">Tasks</Link></span>
      <span class="nav-link"><Link to="/Products">Products</Link></span>

      <Switch>
      <Route exact path="/">
     <TaskForm></TaskForm>
     </Route>
     <Route exact path="/banner">
     <Banner></Banner>
     </Route>
     <Route exact path="/edit/:id">
     <TaskForm isEdit={true}></TaskForm>
     </Route>
     <Route exact path="/tasks">
     <Tasks></Tasks>
     </Route>
     <Route exact path="/products">
     <Products></Products>
     </Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
