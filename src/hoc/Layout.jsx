import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Layout = (props) => {
    let location =  useLocation();

    useEffect (() => {
        const values = queryString.parse(location.search);
        const state =  values.state ? values.state : null;
        const code =  values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            props.googleAuthenticate(state, code)
        } else {
            props.checkAuthenticated();
            props.load_user();
        }
        
    }, [location])

    return (
        <div>
            {props.isAuthenticated && <NavBar />} {/* Render NavBar when isAuthenticated */}
            {props.children}
        </div>
    );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, // Get isAuthenticated from Redux
});

export default connect(mapStateToProps, { checkAuthenticated, load_user, googleAuthenticate }) (Layout);
