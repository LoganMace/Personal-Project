import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../ducks/userReducer';
import Search from '../Search/Search';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import './Header.css';

class Header extends Component {

  componentDidMount() {
    this.props.getUser();
  };

  render() {
    // console.log(this.props);
    return (
      <nav>
        <ul className='nav-links'>
          <li className='nav-buttons'><Link to='/'>Home</Link></li>
          <li className='nav-buttons'><Link to='/profile'>Profile</Link></li>
          <div className='nav-buttons'>
            {this.props.isAuthed ? <Logout/> : <Login/>}
          </div>
        </ul>
        <Search />
      </nav>
    )
  }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps, {getUser})(Header);