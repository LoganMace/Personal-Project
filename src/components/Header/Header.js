import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HamburgerButton } from 'react-hamburger-button';

import { getUser } from '../../ducks/userReducer';
import Search from '../Search/Search';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import './Header.css';

class Header extends Component {

  constructor() {
    super();
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  };

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <nav>
          <div className='burger-btn'>
            <HamburgerButton
              open={this.state.open}
              onClick={this.handleClick.bind(this)}
              width={18}
              height={15}
              strokeWidth={2}
              color='black'
              animationDuration={0.5}
            />
          </div>
          <Search />
        </nav>
        {/* {(!this.state.open) ? null :  */}
        <ul className={'nav-links ' + (this.state.open ? 'slide' : '')}>
          <li className='nav-buttons'><Link to='/'>Home</Link></li>
          <li className='nav-buttons'><Link to='/profile'>Profile</Link></li>
          <li className='nav-buttons'><Link to='/following'>Following</Link></li>
          <div className='nav-buttons'>
            {this.props.isAuthed ? <Logout/> : <Login/>}
          </div>
        </ul>
        {/* } */}
      </div>
    )
  }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps, {getUser})(Header);