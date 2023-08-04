import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../redux/configStore'
import { UserAdminData, getUserArrayApi } from '../../redux/reducers/admin/userAdminReducer'


type Props = {}

const UserAdmin = (props: Props) => {
  const dispatch = useDispatch();
  const { userArray } = useSelector((state: RootState) => state.userAdminReducer);
  const getUserArray = async () => {
    const actionAsync: any = getUserArrayApi(1, 10, '');
    dispatch(actionAsync);
  }
  useEffect(() => {

    getUserArray()


  }, [])

  const handlePaginationChange = (pageIndex: number) => {
    // Load data for the new page index
    const actionAsync: any = getUserArrayApi(pageIndex, 10, '');
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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'>
          <NavLink className="nav-link" to="/useradmin">User Management</NavLink>
          <NavLink className="nav-link" to="/jobadmin">Job Management</NavLink>
          <NavLink className="nav-link" to="/categoryadmin">Job Category Management</NavLink>
          <NavLink className="nav-link" to="/serviceadmin">Service Management</NavLink>
        </div>
        <div className='col-10'>

          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>gender</th>
                <th>birthday</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {userArray?.data.map((prod: UserAdminData, index: number) => {
                return <tr>
                  <td>{prod?.name}</td>
                  <td>{prod?.email}</td>
                  <td>{prod?.phone}</td>
                  <td>{prod?.gender}</td>
                  <td>{prod?.birthday}</td>

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
  );
}

export default UserAdmin