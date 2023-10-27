import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../service/UserService";
import ModalAddNew from "./ModalAddNew";
import ReactPaginate from "react-paginate";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./TableUsers.scss";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([0]);
  const [totalPages, setTotalPages] = useState([0]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    // console.log("oooo", res);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handleEditUserFromModal = (user) => {
    // console.log("55", user);
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUsers(cloneListUser);
  };
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handleDeleteUserFormModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUsers(cloneListUser);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUsers(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 100);
  const getUserExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "Email", "First name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  return (
    <>
      <div className="my-4 add-new">
        <span>
          <h3>List-Users</h3>
        </span>

        <div className="group-btn">
          <label htmlFor="test" className="btn btn-warning">
            <i class="fas fa-file-import"></i> Import
          </label>
          <input id="test" type="file" hidden />

          <CSVLink
            data={dataExport}
            filename={"users.csv"}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUserExport}
          >
            <i class="fas fa-file-export"></i>
            Export
          </CSVLink>
          {/* <CSVDownload data={csvData} target="_blank" />; */}
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fas fa-plus-circle"></i> Add new user
          </button>
        </div>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          // value={keyword}
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fas fa-long-arrow-alt-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fas fa-long-arrow-alt-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fas fa-long-arrow-alt-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fas fa-long-arrow-alt-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      onClick={() => handleEditUser(item)}
                      className="btn btn-warning mx-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFormModal={handleDeleteUserFormModal}
      />
    </>
  );
};

export default TableUsers;
