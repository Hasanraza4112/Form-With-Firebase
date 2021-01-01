import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from     '../screen/home'
import SignUp from   '../screen/signup'
import SignIn from   '../screen/signin'
import Wecancy  from '../screen/form'
import Allform  from '../screen/Allform'




function Routers(){
    return(
          <BrowserRouter>
                <Route exact  path="/"      component={Home} exact />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/wecancy" component={Wecancy} />
                <Route exact path="/allform" component={Allform} />

            </BrowserRouter>

            
    )
}
export default Routers