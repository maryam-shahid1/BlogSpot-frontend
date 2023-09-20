import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { unsetUserToken } from '../features/authSlice';

const Navbar = ({username}) => {
    const {access_token} = getToken();
    const dispatch = useDispatch();

    const guestLinks = (
        <Fragment>
            <Link className='navbar-link' >About</Link>
            <Link className='navbar-link'>Contact</Link>
            <Link className='navbar-link' style={{fontFamily:'Righteous'}}>BlogSpot</Link>
            <Link className='navbar-link' to='/sign-in'> Login </Link>
            <Link className='navbar-link' to='/sign-up'>Register</Link>
        </Fragment>
    )
    const authLinks = (
        <Fragment>
            <Link className='navbar-link'>About</Link>
            <Link className='navbar-link'>Contact</Link>
            <Link className='navbar-link' to='/home'>Home</Link>
            <Link className='navbar-link' style={{fontFamily:'Righteous'}}>BlogSpot</Link>
            <Link className='navbar-link' to='/create'>Create</Link>
            <Link className='navbar-link'>{username}</Link>
            <Link className='navbar-link' to='/sign-in' onClick={handleLogout}>Logout</Link>
        </Fragment>
    )

    function handleLogout() {
        dispatch(unsetUserToken({access_token:null}))
        removeToken();
    }

  return (
    <div>
        <div className='navbar-outer-div'>
            <div className='navbar'>
                {access_token ? authLinks : guestLinks}
            </div>
        </div>

    </div>
  )
}

Navbar.propTypes = {
    username: PropTypes.string.isRequired
};

export default Navbar
