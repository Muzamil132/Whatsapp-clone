
import './App.css';
import Sidebar  from './Sidebar'
import Sidebarchat from './Sidebarchat';

import Chat from './Chat'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Login'
import {useContext }from 'react'
import {StateContext} from './StateProvider'

function App() {
 

  const {user} =useContext(StateContext)

   
  return (
     !user?<Login/>
      :(
        <div className="App">  <div className="app_body">
        <Router>
        
        <Sidebar/>
          <Switch>
         
            <Route path="/room/:roomId" component={Chat}></Route>
          </Switch>
        </Router>
       </div>
    </div>
        
      )
   
  );
}

export default App;
