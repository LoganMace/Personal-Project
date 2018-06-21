import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home';
import EditProfile from './components/EditProfile/EditProfile';
import Movie from './components/Movie/Movie';
import Profile from './components/Profile/Profile';
import ReviewForm from './components/ReviewForm/ReviewForm';
import PublicProfile from './components/PublicProfile/PublicProfile';
import Following from './components/Following/Following';



export default (
  <Switch>
    <Route component={Home} exact path={'/'}/>
    <Route component={EditProfile} path={'/editprofile'}/>
    <Route component={PublicProfile} path={'/profile/:id'}/>
    <Route component={Profile} path={'/profile'}/>
    <Route component={ReviewForm} path={'/movie/:id/reviewform'}/>
    <Route component={Movie} path={'/movie/:id'}/>
    <Route component={Following} path={'/following'}/>
  </Switch>
);