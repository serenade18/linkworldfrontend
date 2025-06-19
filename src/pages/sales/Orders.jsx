import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { fetchAllOrders } from '../../actions/auth';

const Orders = ({ isAuthenticated, fetchAllOrders, orders }) => {
    const navigate = useNavigate();
    const maxPagesDisplayed = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    console.log('current page', currentPage)

    useEffect(() => {
        if (!isAuthenticated) {
        //navigate('/');
        } else {
        fetchAllOrders().then(() => {
          setLoading(false);
        });
        }
    }, [isAuthenticated, navigate, fetchAllOrders]);

    if (!isAuthenticated) { 
        navigate('/');
    } 

    const responsiveStyle = {
        width: '100%',
        marginLeft: '0',
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

    const viewOrder = (orders_id) => {
        navigate('/ordersdetails/' + orders_id);
    };

    const handleDelete = async (orders_id) => {
    };

    if (!orders) {
        orders = []; // Ensure orders is defined even if it's initially undefined
    }
  
    // useEffect to handle initial load or authentication changes
    useEffect(() => {
      const storedPage =  1;
      setCurrentPage(parseInt(storedPage, 10));
      fetchAllOrders(storedPage, searchQuery);  // Initial fetch with potentially stored search
    }, [isAuthenticated, navigate, fetchAllOrders, searchQuery]);
     

    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="#" className="btn btn-outline-white">
                                <i className="fi fi-sr-bags-shopping"></i> All Order
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
                                    {loading ? (
                                    <div className="dataTable-container">
                                        <div className="text-center py-4">
                                        <p>Loading...</p>
                                        </div>
                                    </div>  
                                    ) : (
                                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div className="dataTable-top">
                                        
                                        </div>

                                        <div className="dataTable-container">
                                        {orders.length > 0 ? (
                                        <table className="table table-flush dataTable-table" id="datatable-search">
                                            <thead className="thead-light">
                                            <tr>
                                                <th data-sortable="" style={{ width: '2.6514%' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Id
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '10.' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Farmhub
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '10' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Town
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '10' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Kgs
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '10' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Quality
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '5' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Discount
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '5' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    cost
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '5' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Contact
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '5' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Delivery Cost
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '10.6114%' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Added on
                                                </a>
                                                </th>
                                                <th data-sortable="" style={{ width: '14%' }}>
                                                <a href="#" className="dataTable-sorter">
                                                    Action
                                                </a>
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                                {orders.length > 0 ? (
                                                orders.map((order, index) => (
                                                    order.order_details.map((detail, i) => (
                                                    <tr 
                                                        className="cursor-pointer" 
                                                        key={`${order.order_id}-${detail.farmhub.farmhub_id}`} 
                                                        onClick={() => viewOrder(order.order_id)}
                                                    >
                                                        <td>
                                                        <div className="d-flex align-items-center">
                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{order.order_id}</p>
                                                        </div>
                                                        </td>
                                                        <td className="font-weight-bold">
                                                        <span className="my-2 text-xs">{detail.farmhub.farmhub_name}</span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">{order.destination_address}</span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">
                                                            {detail.farmhub.products.reduce((sum, product) => sum + product.total_weight, 0)} kg
                                                        </span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">Standard</span> {/* Replace if you have a real field */}
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">None</span> {/* Replace if discount available */}
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">{detail.farmhub.delivery_cost}</span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">{detail.farmhub.contact || 'N/A'}</span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">
                                                            {
                                                            detail.farmhub.products.reduce((sum, product) => sum + (product.quantity * product.unit_weight), 0)
                                                            }
                                                        </span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <span className="my-2 text-xs">{new Date(order.order_date).toLocaleString()}</span>
                                                        </td>
                                                        <td className="text-xs font-weight-bold">
                                                        <div className="d-flex align-items-center">
                                                            <button
                                                            className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                            onClick={() => viewOrder(order.order_id)}
                                                            >
                                                            <i className="fas fa-eye" aria-hidden="true"></i>
                                                            </button>
                                                            <span>View</span>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    ))
                                                ))
                                                ) : (
                                                <tr>
                                                    <td colSpan="11">No records available.</td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p>No records found.</p>
                                            </div>
                                        )}
                                        </div>

                                        

                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  orders: state.auth.orders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders: (pageNumber, searchQuery = '') => dispatch(fetchAllOrders(pageNumber, searchQuery)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
