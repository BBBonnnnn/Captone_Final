import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore';
import { ServiceAdminInterface, getFullServiceArrayApi, getServiceArrayApi } from '../../redux/reducers/admin/serviceAdminReducer';
import { http } from '../../util/22-06-2023-08-41-20-config';
import CreateServiceModal from './CreateModal/CreateServiceModal';
import EditServiceAdmin from './EditModal/EditServiceAdmin';

type Props = {}

const ServiceAdmin = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { serviceArray, fullServiceArray } = useSelector((state: RootState) => state.serviceAdminReducer);
  const getServiceArray = async () => {
    const actionAsync = getServiceArrayApi(1, 10, '');
    dispatch(actionAsync);
  }
  const getFullServiceArray = async () => {
    const actionAsync = getFullServiceArrayApi();
    dispatch(actionAsync);
  }
  useEffect(() => {

    getServiceArray()
    getFullServiceArray()

  }, [])

  useEffect(() => {

    const actionAsync = getServiceArrayApi(1, 10, '');
    dispatch(actionAsync);


  }, [fullServiceArray])
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
    <div className='AdminManagement container-fluid my-3'>
      <div className='row'>
        <div className='col-2' style={{ borderRight: "3px solid #28a745", backgroundColor: "#f8f9fa" }}>
          <div className="d-flex flex-column align-items-start p-4">
            <NavLink className="nav-link mb-3" to="/useradmin"><i className="fas fa-user me-2"></i> User Management</NavLink>
            <NavLink className="nav-link mb-3" to="/jobadmin"><i className="fas fa-briefcase me-2"></i>Job Management</NavLink>
            <NavLink className="nav-link mb-3" to="/categoryadmin"> <i className="fas fa-list-alt me-2"></i>Job Category Management</NavLink>
            <NavLink className="nav-link" to="/serviceadmin"><i className="fas fa-cog me-2"></i>Service Management</NavLink>
          </div>
        </div>
        <div className='col-10'>
          <div className='mb-3 d-flex justify-content-between'>
            {/* Create button */}
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#CreateServiceModal">
              Create
            </button>


          </div>
          <h2 className="h4 fw-bold text-center text-success">Service Management</h2> {/* Apply Bootstrap's h4 and fw-bold classes */}
          <table className="table table-bordered table-striped">
            <thead className="table-success">
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
                return <tr key={prod.id} >
                  
                  <td>{prod?.maCongViec}</td>
                  <td>{prod?.maNguoiThue}</td>
                  <td>{prod?.ngayThue}</td>
                  <td>{prod?.hoanThanh ? 'Đã  Hoàn Thành' : 'Chưa Hoàn Thành'}</td>

                  <td>
                    <button type="button" className="btn btn-primary edit-button mx-2" data-bs-toggle="modal" data-bs-target={`#EditServiceModal${prod.id}`}>
                      Edit
                    </button>
                    <EditServiceAdmin prod={prod} />
                    <button className="btn btn-danger delete-button" onClick={() => {
                      console.log(prod.id)
                      let res: any = http.delete(`/api/thue-cong-viec/${prod.id}`);
                      if (res) {
                        getFullServiceArray();
                        alert('xoa thanh Cong')
                      } else {
                        alert('xoa that bai')
                      }
                    }}>Delete</button>
                  </td>

                </tr>

              })}




            </tbody>
          </table>
          {renderPaginationButtons()}
        </div>
      </div>

      <CreateServiceModal />

    </div>
  )
}

export default ServiceAdmin