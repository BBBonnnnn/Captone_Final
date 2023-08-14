import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore';
import { JobItemInterface, getFullJobArrayApi, getJobArrayApi } from '../../redux/reducers/admin/UserJobReducer';
import { http } from '../../util/22-06-2023-08-41-20-config';
import CreateJobModal from './CreateModal/CreateJobModal';
import EditJobAdmin from './EditModal/EditJobAdmin';

type Props = {}

const JobAdmin = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { jobArray } = useSelector((state: RootState) => state.UserJobReducer);
  const getJobArray = async () => {
    const actionAsync = getJobArrayApi(1, 10, '');
    dispatch(actionAsync);
  }
  const getFullJobArray = async () => {
    const actionAsync = getFullJobArrayApi();
    dispatch(actionAsync);
  }

  useEffect(() => {

    getJobArray()
    getFullJobArray()

  }, [])

  const handlePaginationChange = (pageIndex: number) => {
    // Load data for the new page index
    const searchBar = document.getElementsByName('searchBar')[0] as HTMLInputElement;
    const searchKeyword = searchBar.value;
    const actionAsync = getJobArrayApi(pageIndex, 10, searchKeyword);
    dispatch(actionAsync);
  };

  const renderPaginationButtons = () => {
    if (!jobArray) return null;
    const totalPages = Math.ceil(jobArray.totalRow / (jobArray.pageSize || 10));
    const currentPage = jobArray.pageIndex;

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
    <div className='AdminManagement container-fluid my-3 ' >
      <div className='row'>
          <div className='mb-3 d-flex justify-content-between'>
            {/* Create button */}
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#CreateJobModal">
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

                  const actionAsync = getJobArrayApi(1, 10, e.target.value);
                  dispatch(actionAsync);
                }}
              />

            </div>
          </div>
          <h2 className="h4 fw-bold text-center text-success">Job Management</h2> {/* Apply Bootstrap's h4 and fw-bold classes */}
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>tenCongViec</th>
                <th>nguoiTao</th>
                <th>moTaNgan</th>
                <th>giaTien</th>
                <th>saoCongViec</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody >
              {jobArray?.data.map((prod: JobItemInterface, index: number) => {
                return <tr key={prod.id}>
                  <td>{prod?.tenCongViec}</td>
                  <td>{prod?.nguoiTao}</td>
                  <td>{prod?.moTaNgan}</td>
                  <td>{prod?.giaTien}</td>
                  <td>{prod?.saoCongViec}</td>

                  <td><button type="button" className="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target={`#EditJobModal${prod.id}`}>
                    Edit
                  </button>
                    <EditJobAdmin prod={prod} /></td>
                </tr>
              })}




            </tbody>
          </table>
          {renderPaginationButtons()}
        
      </div>
      <CreateJobModal />
    </div>
  )
}

export default JobAdmin