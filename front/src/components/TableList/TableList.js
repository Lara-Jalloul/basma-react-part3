import React, { useState, useEffect, useContext } from "react";
import "./Table.css";
import {
  Find,
  FilterContainer,
  FilterText,
  Filter,
  Select,
  Option,
  FilterSearch,
  Caption,
} from "./TableListElement";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import ReactPaginate from "react-paginate";
import SessionContext from "../../context/SessionContext";

function TableList() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    if (e.target.value === "----") {
      setPagination("");
    } else if (e.target.value === "20") {
      setPagination(20);
    } else if (e.target.value === "40") {
      setPagination(40);
    } else if (e.target.value === "60") {
      setPagination(60);
    }
    console.log(e.target.value);
  };

  const getData = async () => {
    let result = await axios.get(
      `http://localhost:8000/api/admins/filter?nb=${pagination}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    setUsers(result.data.users.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [pagination]);

  const filterUsers = users.filter((user) => {
    return user.first_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Find>
        <FilterContainer>
          <Filter>
            <FilterText>Filter:</FilterText>
            <Select onChange={onChange} defaultChecked={true}>
              <Option selected>----</Option>
              <Option value={20}>20</Option>
              <Option value={40}>40</Option>
              <Option value={60}>60</Option>
            </Select>
          </Filter>

          <FilterSearch>
            <input
              className="nosubmit"
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </FilterSearch>
        </FilterContainer>
      </Find>
      <table>
        <Caption>List of Registered Users</Caption>
        <thead>
          <tr>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Email</th>
          </tr>
        </thead>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "700px",
              marginTop: "200px",
            }}
          >
            <FadeLoader
              size={15}
              color={"rgb(235, 95, 95)"}
              loading={loading}
            />
          </div>
        ) : (
          <tbody>
            {filterUsers &&
              filterUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td data-label="First_Name">{user.first_name}</td>
                    <td data-label="Last_Name">{user.last_name}</td>
                    <td data-label="Email">{user.email}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        // pageCount={}
        // pageCount={pageCount}
        // onPageChange={}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default TableList;
