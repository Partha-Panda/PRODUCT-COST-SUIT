import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Splash from './Splash';
import Login from './Login'
import Dashboard from './Dashboard';

import Masterdatainsert from './Masterdatainsert';
import Masterdataview from './Masterdataview';
import Masterdataupdate from './Masterdataupdate';
import MasterdataSingleview from "./MasterdataSingleview";
function App() {
  return (
    <div>
      <Router>
        <Switch>
         
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/masterdata" component={Masterdataview}></Route>
          <Route path="/createitem" component={Masterdatainsert}></Route>
          <Route path="/updateitem" component={Masterdataupdate}></Route>
          <Route path="/viewitem" component={MasterdataSingleview}></Route>
          <Route path="/" component={Splash}></Route>
          
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;