import React from 'react';
import './styles.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    const handleLogout = ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
        event.preventDefault();
        logout();
    }

    useEffect(()=> {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    },[location]);

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-logo-text">
                    <h4>DS Catalog</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu">
                    <li>
                        <NavLink className="nav-link" to="/" exact>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/products"  >Catálogo</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/admin"  >Admin</NavLink>
                    </li>
                </ul>
            </div>

            <div className="col-3 text-right">
                
                {currentUser && (
                    <>
                        {currentUser}
                        <a  href="#" 
                            className="nav-link active d-inline" 
                            onClick={handleLogout}> 
                            LOGOUT
                        </a>
                    </>
                )}
                
                {!currentUser && (
                    <Link className="nav-link active d-inline" to="/auth/login">LOGIN</Link>
                )}
                
            </div>
            
        </nav>
    )
}



export default Navbar;