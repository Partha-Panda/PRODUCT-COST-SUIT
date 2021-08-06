import {
  HashRouter,
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
import CostOperationInsert from "./CostOperationInsert";
import OperationCostView from "./OperationCostView";
import OperationSingleView from "./OperationSingleView";
import OperationCostUpdate from "./OperationCostUpdate";
import MaterialCostInsert from "./MaterialCostInsert";
import CostView from "./CostView";
import MaterialCostSingleView from "./MaterialCostSingleView";
import MaterialCostUpadte from "./MaterialCostUpadte";
import CalculationCostOperationInsert from "./CalculationCostOperationInsert";
import CalculationCostview from "./CalculationCostview";
import CalculationCostSingleView from "./CalculationCostSingleView";
import CalculationCostUpadte from "./CalculationCostUpadte";
import Adduser from "./Adduser";
function App() {
  return (
    <div>
      <HashRouter hashType="noslash">
        <Switch>
         
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/masterdata" component={Masterdataview}></Route>
          <Route path="/createitem" component={Masterdatainsert}></Route>
          <Route path="/updateitem" component={Masterdataupdate}></Route>
          <Route path="/viewitem" component={MasterdataSingleview}></Route>
          <Route path="/Costoperationinsert" component={CostOperationInsert}></Route>
          <Route path="/OperationCostView" component={OperationCostView}></Route>
          <Route path="/OperationSingleView" component={OperationSingleView}></Route>
          <Route path="/OperationUpdate" component={OperationCostUpdate}></Route>
          <Route path="/Costinsert" component={MaterialCostInsert}></Route>
          <Route path="/Cosview" component={CostView}></Route>
          <Route path="/CostSview" component={MaterialCostSingleView}></Route>
          <Route path="/CostUpdate" component={MaterialCostUpadte}></Route>
          <Route path="/calculationCost" component={CalculationCostOperationInsert}></Route>
          <Route path="/calculationCostView" component={CalculationCostview}></Route>
          <Route path="/calculationSCostView" component={CalculationCostSingleView}></Route>
          <Route path="/calculationCostUpdate" component={CalculationCostUpadte}></Route>
          <Route path="/adduser" component={Adduser}></Route>
          <Route path="/" component={Splash}></Route>
          
          
        </Switch>
      </HashRouter>
      
    </div>
  );
}

export default App;
