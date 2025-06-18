import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import navLogo from '../assets/logo.png';
import { connect } from "react-redux";
import { logout } from '../actions/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Config from '../utils/Config';

const NavBar = ({ logout, user, isSidebarOpen, isAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Effect for initializing PerfectScrollbar
    useEffect(() => {
        const sidenavElement = document.getElementById('sidenav-main');
        if (sidenavElement) {
            const ps = new PerfectScrollbar(sidenavElement, {
                wheelPropagation: true,
            });

            // Cleanup on component unmount
            return () => {
                ps.destroy();
            };
        }
    }, []);

    if (!isAuthenticated) {
        navigate('/');
    }

    // Determine user type
    const isAdmin = user && user.user_type === 'admin';

    return (
        <aside
            className={`sidenav ${
                isSidebarOpen
                    ? 'navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 ps ps--active-y bg-white'
                    : 'bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 ps ps--active-y'
            }`}
            id="sidenav-main"
        >
            <div className="sidenav-header">
                <i
                    className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true"
                    id="iconSidenav"
                ></i>
                <Link className="navbar-brand m-0" to="/home" target="_blank">
                    <img src={navLogo} fs-2 alt="main_logo" /><br/>
                    <span className="ms-1 font-weight-bold">DRIVER MANAGEMENT PORTAL</span>
                </Link>
            </div>

            <hr className="horizontal dark mt-0" />

            <div className="collapse navbar-collapse w-auto h-auto ps" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    {isAdmin && (
                        <li className="nav-item">
                            <Link
                                data-bs-toggle="collapse"
                                to={"/home"}
                                className="nav-link"
                                role="button"
                            >
                                <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                                    <i className="fi fi-sr-apps-add text-primary text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                    )}

                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                            MODULES
                        </h6>
                    </li>
                    {isAdmin
                        ? Config.adminSideBar.map((item, index) => (
                              <li className="nav-item" key={index}>
                                  <Link
                                      to={item.url}
                                      data-bs-toggle="collapse"
                                      className="nav-link"
                                      role="button"
                                      aria-expanded="false"
                                  >
                                      <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                                          <i className={item.icons}></i>
                                      </div>
                                      <span className="nav-link-text ms-1">{item.title}</span>
                                  </Link>
                              </li>
                              
                          ))
                        : Config.userSideBar.map((item, index) => (
                              <li className="nav-item" key={index}>
                                  <Link
                                      to={item.url}
                                      data-bs-toggle="collapse"
                                      className="nav-link"
                                      role="button"
                                      aria-expanded="false"
                                  >
                                      <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                                          <i className={item.icons}></i>
                                      </div>
                                      <span className="nav-link-text ms-1">{item.title}</span>
                                  </Link>
                              </li>
                          ))}

                    <li className="nav-item">
                        <a
                            data-bs-toggle="collapse"
                            onClick={() => {
                                logout();
                                window.location.href = "/";
                            }}
                            className="nav-link"
                            aria-controls="authExamples"
                            role="button"
                            aria-expanded="false"
                        >
                            <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                                <i className="ni ni-lock-circle-open text-danger text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
