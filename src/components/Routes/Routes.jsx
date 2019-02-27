import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Createjob from "../Jobs/Createjob";
import Myposts from "../Jobs/Myposts";
import Jobs from "../Jobs/Jobs";
import Teachers from "../Profile/Teachers";
import Additionaldetails from "../Profile/Additionaldetails";
import Editprofile from "../Profile/Editprofile";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Viewjob from "../Jobs/Viewjob";
import Viewprofile from "../Profile/Viewprofile";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/editprofile" component={Editprofile} />
    <Route path="/additionaldetails" component={Additionaldetails} />
    <Route path="/contact" component={Contact} />
    <Route path="/createjob" component={Createjob} />
    <Route path="/myposts" component={Myposts} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/viewprofile/:id?" component={Viewprofile} />
    <Route path="/viewjob/:id?" component={Viewjob} />
    <Route path="/jobs/:name?" component={Jobs} />
    <Route path="/teachers/:name?" component={Teachers} />
  </Switch>
);

export default Routes;
