import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore';
import { CategoryJobInterface, getCategoryArrayApi, getFullCategoryArrayApi } from '../../redux/reducers/admin/categoryAdminReducer';
import { http } from '../../util/22-06-2023-08-41-20-config';
import CreateCategoryModal from './CreateModal/CreateCategoryModal';
import EditCategoryAdmin from './EditModal/EditCategoryAdmin';

type Props = {}

const CategoryAdmin = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
  const { categoryArray, fullCategoryArray } = useSelector((state: RootState) => state.categoryAdminReducer);
  const getCategoryArray = async () => {
    const actionAsync = getCategoryArrayApi(1, 10, '');
    dispatch(actionAsync);
  }
  const getFullCategoryArray = async () => {
    const actionAsync = getFullCategoryArrayApi();
    dispatch(actionAsync);
  }
  useEffect(() => {

    getCategoryArray()

    getFullCategoryArray()
  }, [])
  useEffect(() => {
    
    const actionAsync = getCategoryArrayApi(1, 10, '');
    dispatch(actionAsync);


  }, [fullCategoryArray])
  const handlePaginationChange = (pageIndex: number) => {
    // Load data for the new page index
    const searchBar = document.getElementsByName('searchBar')[0] as HTMLInputElement;
    const searchKeyword = searchBar.value;
    
    const actionAsync = getCategoryArrayApi(pageIndex, 10, searchKeyword);
    dispatch(actionAsync);
  };

  const renderPaginationButtons = () => {
    if (!categoryArray) return null;
    const totalPages = Math.ceil(categoryArray.totalRow / (categoryArray.pageSize || 10));
    const currentPage = categoryArray.pageIndex;

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
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#CreateCategoryModal">
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

                  const actionAsync = getCategoryArrayApi(1, 10, e.target.value);
                  dispatch(actionAsync);
                }}
              />

            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>tenLoaiCongViec</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryArray?.data.map((prod: CategoryJobInterface, index: number) => {
                return <tr>
                  <td>{prod?.id}</td>
                  <td>{prod?.tenLoaiCongViec}</td>


                  <td>
                  <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target={`#EditServiceModal${prod.id}`}>
                      Edit
                    </button>
                    <EditCategoryAdmin prod={prod}/>
                    <button className="btn btn-danger" onClick={()=>{
                      
                      let res:any = http.delete(`/api/loai-cong-viec/${prod.id}`);
                      if(res){
                        getFullCategoryArray();
                        alert('xoa thanh Cong')
                      }else{
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
      <CreateCategoryModal/>
    </div>
  )
}

export default CategoryAdmin