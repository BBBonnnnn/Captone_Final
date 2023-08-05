import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore'
import { UserAdminData, getFullUserArrayApi, getUserArrayApi } from '../../redux/reducers/admin/userAdminReducer'
import { http } from '../../util/22-06-2023-08-41-20-config'
import { history } from '../..'
import CreateUserModal from './CreateModal/CreateUserModal'


type Props = {}

const UserAdmin = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
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
    <div className='container-fluid my-3'>
      <div className='row'>
        <div className='col-2'>
          <NavLink className="nav-link" to="/useradmin">User Management</NavLink>
          <NavLink className="nav-link" to="/jobadmin">Job Management</NavLink>
          <NavLink className="nav-link" to="/categoryadmin">Job Category Management</NavLink>
          <NavLink className="nav-link" to="/serviceadmin">Service Management</NavLink>
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
                  <td>{prod.gender ? 'male' : 'female'}</td>
                  <td>{prod?.birthday}</td>

                  <td>
                    <button className="btn btn-primary" onClick={() => {
                      console.log(prod.gender);
                    }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => {
                      console.log("Before:", fullUserArray.length)
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
      <CreateUserModal/>
    </div>
  );
}

export default UserAdmin