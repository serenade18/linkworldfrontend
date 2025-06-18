import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function HeaderNav({ user }) {
  const location = useLocation();
  const { id } = useParams();

  const getPageName = () => {
    // Define your route-to-page name mapping here
    const routeToPageName = {
      '/dashboard': 'Dashboard',
      '/drivers': 'Drivers',
      '/orders': 'Orders List',
      '/routing': 'Routing',
      '/crates': 'Crates',
      '/addpayments': 'Add Payment',
    };

    if (id) {
      // Handle dynamic routes
      if (location.pathname.includes('customerdetails') && location.pathname.includes('dashboard')) {
        return 'Customer Dashboard';
      } else if (location.pathname.includes('farmerdetails') && location.pathname.includes('dashboard')) {
        return 'Farmer Dashboard';
      } else if (location.pathname.includes('customerdetails')) {
        return 'Edit Customer';
      } else if (location.pathname.includes('ordersdetails')) {
        return 'Edit Order';
      } else if (location.pathname.includes('paymentsdetails')) {
        return 'Edit Payment';
      } else if (location.pathname.includes('batchdetails')) {
        return 'View Batch';
      } else if (location.pathname.includes('download-invoice')) {
        return 'Download Invoice';
      } else if (location.pathname.includes('employeedetails')) {
        return 'Edit Employee';
      }
    } else {
      // Otherwise, handle static routes with the routeToPageName object
      return routeToPageName[location.pathname] || 'Unknown Page';
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      if (isSidebarOpen) {
        bodyElement.classList.remove('g-sidenav-show', 'bg-gray-100');
        bodyElement.classList.add('g-sidenav-pinned');
      } else {
        bodyElement.classList.remove('g-sidenav-pinned');
        bodyElement.classList.add('g-sidenav-show', 'bg-gray-100');
      }
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const desktopStyle = {
      width: 'calc(100% - 265px)',
      marginLeft: '265px',
  };

  const mobileStyle = {
      width: '100%',
      marginLeft: '0',
  };

  // Apply media queries
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  return (
    <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl z-index-sticky" id="navbarBlur" data-scroll="false">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="text-white">
                <i className="ni ni-box-2"></i>
              </li>
              <li className="breadcrumb-item text-sm text-white">
                <a className="opacity-5 text-white" href="#">Pages</a>
              </li>
            </ol>
            <h6 className="font-weight-bolder mb-0 text-white">{getPageName()}</h6>
          </nav>

          <div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-block d-lg-none">
            <a onClick={toggleSidebar} className="nav-link p-0 text-white">
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white"></i>
                <i className="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </div>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              <div className="input-group">
               
              </div>
            </div>

            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <div className="nav-link text-white font-weight-bold px-0">
                  <i className="fa fa-user me-sm-1" aria-hidden="true"></i>
                  {user && user.user_type === 'admin' && <span className="d-sm-inline d-none">{user ? user.first_name : ''} {user ? user.last_name : ''}</span>}
                  {user && user.user_type === 'normal' && <span className="d-sm-inline d-none">Hi,  {user ? user.first_name : ''}</span>}
                  <br/>
                  {user && user.user_type === 'admin' && <span className="d-sm-inline d-none">System Administrator</span>}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HeaderNav);