import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Filter = styled.div`
  // margin: 5px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
const FilterSearch = styled.div``;
const Find = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Caption = styled.caption`
  font-size: 1.5em;
  margin: 0.9em 0 0.9em;
  color: black;
`;

function TableList() {
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
        "Content-Type": "application/json",
      }
    );
    setUsers(result.data.users.data);
    setLoading(false);
  };

  const filterUsers = users.filter((user) => {
    return user.first_name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    getData();
  }, [pagination]);

  // const pageCount = Math.ceil(users.length / pagination);

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
        </FilterContainer>{" "}
        <FilterSearch>
          <input
            className="nosubmit"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterSearch>
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
