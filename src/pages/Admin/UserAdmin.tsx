import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore'
import { UserAdminData, getFullUserArrayApi, getUserArrayApi } from '../../redux/reducers/admin/userAdminReducer'
import { http } from '../../util/22-06-2023-08-41-20-config'
import { history } from '../..'
import CreateUserModal from './CreateModal/CreateUserModal'
import EditUserAdmin from './EditModal/EditUserAdmin'


type Props = {}

const UserAdmin = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { userArray, fullUserArray } = useSelector((state: RootState) => state.userAdminReducer);
  const getUserArray = async () => {
    const actionAsync = getUserArrayApi(1, 10, '');
    dispatch(actionAsync);
  }

  const getFullUserArray = async () => {
    const actionAsync = getFullUserArrayApi();
    dispatch(actionAsync);
  }
  useEffect(() => {

    getUserArray()
    getFullUserArray()

  }, [])

  useEffect(() => {

    const actionAsync = getUserArrayApi(1, 10, '');
    dispatch(actionAsync);


  }, [fullUserArray])

  const handlePaginationChange = (pageIndex: number) => {
    // Load data for the new page index
    const searchBar = document.getElementsByName('searchBar')[0] as HTMLInputElement;
    const searchKeyword = searchBar.value;

    const actionAsync = getUserArrayApi(pageIndex, 10, searchKeyword);
    dispatch(actionAsync);
  };


  const renderPaginationButtons = () => {
    if (!userArray) return null;
    const totalPages = Math.ceil(userArray.totalRow / (userArray.pageSize || 10));
    const currentPage = userArray.pageIndex;

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
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#CreateUserModal">
              Create
            </button>
            {/* Search bar */}
            <div className='w-50'>
              <input
                type='text'
                className='form-control mr-2'
                placeholder='Search...'
                name='searchBar'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                  const actionAsync = getUserArrayApi(1, 10, e.target.value);
                  dispatch(actionAsync);
                }}
              />

            </div>
          </div>
          <h2 className="h4 fw-bold text-center text-success">User Management</h2> {/* Apply Bootstrap's h4 and fw-bold classes */}
          <table className='table table-bordered table-striped'>
            <thead className="table-success text-light">
              <tr >
                <th >name</th>
                <th>email</th>
                <th>phone</th>
                <th>gender</th>
                <th>birthday</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {userArray?.data.map((prod: UserAdminData, index: number) => {
                return <tr key={prod.id} >
                  <td>{prod?.name}</td>
                  <td>{prod?.email}</td>
                  <td>{prod?.phone}</td>
                  <td>{prod.gender ? 'male' : 'female'}</td>
                  <td>{prod?.birthday}</td>

                  <td>
                    <button type="button" className="btn btn-primary edit-button mx-2" data-bs-toggle="modal" data-bs-target={`#EditUserModal${prod.id}`}>
                      Edit
                    </button>
                    <EditUserAdmin prod={prod} />



                    <button className="btn btn-danger delete-button" onClick={() => {

                      let res: any = http.delete(`/api/users?id=${prod.id}`);
                      if (res) {
                        getFullUserArray();
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
      <CreateUserModal />
    </div>
  );
}

export default UserAdmin