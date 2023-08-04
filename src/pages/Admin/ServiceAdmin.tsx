import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { RootState } from '../../redux/configStore';
import { ServiceAdminInterface, getServiceArrayApi } from '../../redux/reducers/admin/serviceAdminReducer';

type Props = {}

const ServiceAdmin = (props: Props) => {
  const dispatch = useDispatch();
  const { serviceArray } = useSelector((state: RootState) => state.serviceAdminReducer);
  const getServiceArray = async () => {
    const actionAsync: any = getServiceArrayApi(1, 10, '');
    dispatch(actionAsync);
  }
  useEffect(() => {

    getServiceArray()


  }, [])
  const handlePaginationChange = (pageIndex: number) => {
    // Load data for the new page index
    const actionAsync: any = getServiceArrayApi(pageIndex, 10, '');
    dispatch(actionAsync);
  };

  const renderPaginationButtons = () => {
    if (!serviceArray) return null;
    const totalPages = Math.ceil(serviceArray.totalRow / (serviceArray.pageSize || 10));
    const currentPage = serviceArray.pageIndex;

    const pageButtons = [];

    // Previous Button
    pageButtons.push(
      <li key="previous" className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePaginationChange(currentPage - 1)}>
          Previous
        </button>
      </li>
    );

    // Page Buttons
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      if (i >= 1 && i <= totalPages) {
        pageButtons.push(
          <li key={i} className={`page-item${i === currentPage ? ' active' : ''}`}>
            <button className="page-link" onClick={() => handlePaginationChange(i)}>
              {i}
            </button>
          </li>
        );
      }
    }

    // Next Button
    pageButtons.push(
      <li key="next" className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePaginationChange(currentPage + 1)}>
          Next
        </button>
      </li>
    );

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">{pageButtons}</ul>
      </nav>
    );
  };
  
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-2'>
                <NavLink className="nav-link" to="/useradmin">User Management</NavLink>
                <NavLink className="nav-link" to="/jobadmin">Job Management</NavLink>
                <NavLink className="nav-link" to="/categoryadmin">Job Category Management</NavLink>
                <NavLink className="nav-link" to="/serviceadmin">Service Management</NavLink>
            </div>
            <div className='col-10'>
            <table className="table table-bordered">
            <thead>
              <tr>
                <th>maCongViec</th>
                <th>maNguoiThue</th>
                <th>ngayThue</th>
                <th>hoanThanh</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {serviceArray?.data.map((prod: ServiceAdminInterface, index: number) => {
                return <tr>
                  <td>{prod?.maCongViec}</td>
                  <td>{prod?.maNguoiThue}</td>
                  <td>{prod?.ngayThue}</td>
                  <td>{prod?.hoanThanh}</td>

                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              })}

             

              
            </tbody>
          </table>
          {renderPaginationButtons()}
            </div>
        </div>
    </div>
  )
}

export default ServiceAdmin