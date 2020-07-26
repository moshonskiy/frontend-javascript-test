import React, { useState, useEffect, useMemo } from "react";
import { ModalOnStart } from "./components/ModalOnStart/ModalOnStart";
import { TableHeader } from "./components/TableHeader/TableHeader";
import { PaginationComponent } from "./components/PaginationComponent/PaginationComponent";
import { Search } from "./components/Search/Search";
import { TableRowItem } from "./components/TableRowItem/TableRowItem";
import Loader from "react-loader-spinner";
import { Table } from "react-bootstrap";
import { NewTableItemForm } from "./components/NewTableItemForm/NewTableItemForm";
import { Container, Row, Col, Button } from "react-bootstrap";
import { headers } from "./resources/tableHeaders";

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const App = () => {
  const [modalToggle, setModalToggle] = useState(true);
  const [fetchUrl, setFetchUrlType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableRowItemInfo, setTableRowItemInfo] = useState({});
  const [tableRowItemToggle, setTableRowItemToggle] = useState(false);
  const [newTableItemToggle, setNewTableItemToggle] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterInputBtn, setFilterInputBtn] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

  const handleTableRowClick = (tableItem) => {
    setTableRowItemInfo(tableItem);
    setTableRowItemToggle(true);
  };

  useEffect(() => {
    const getData = (url) => {
      setIsFetching(true);
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTableData(data);
          setIsFetching(false);
        });
    };

    getData(fetchUrl);
  }, [setTableData, fetchUrl]);

  const computedData = useMemo(() => {
    let sortedData = tableData;

    // searching (filtering)
    if (filterInputBtn && search) {
      sortedData = sortedData.filter((rowItem) => {
        const tableItemToArrOfStr = Object.values(rowItem)
          .filter((item) => typeof item !== "object")
          .some((item) =>
            item.toString().toLowerCase().includes(search.toLowerCase())
          );
        return tableItemToArrOfStr;
      });

      return sortedData;
    }

    // sorting table by column
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      sortedData = sortedData.sort((a, b) => {
        if (typeof a[sorting.field] === "number") {
          return sorting.order === "asc"
            ? a[sorting.field] - b[sorting.field]
            : b[sorting.field] - a[sorting.field];
        } else {
          return (
            reversed *
            a[sorting.field]
              .toString()
              .localeCompare(b[sorting.field].toString())
          );
        }
      });
    }

    setTotalItems(sortedData.length);

    // current page slice
    return sortedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [tableData, sorting, currentPage, filterInputBtn, search]);

  if (modalToggle) {
    return (
      <ModalOnStart
        setModalToggle={setModalToggle}
        setFetchUrlType={setFetchUrlType}
      />
    );
  }

  return (
    <>
      {!isFetching ? (
        <Container className="App">
          <Row className="justify-content-md-center">
            <Col>
              <PaginationComponent
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </Col>
          </Row>
          <Row
            style={{ marginBottom: "10px" }}
            className="justify-content-md-center"
          >
            <Col
              md={{ span: 4, offset: 0 }}
              className="justify-content-md-left"
            >
              <Button
                variant="primary"
                onClick={() => setNewTableItemToggle(true)}
                disabled={newTableItemToggle}
              >
                Добавить
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <Row style={{ justifyContent: "space-between" }}>
                <Search
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                  setFilterInputBtn={setFilterInputBtn}
                />
                <div onClick={() => setFilterInputBtn(true)}>
                  <Button variant="primary" disabled={!search}>
                    Найти
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>

          {newTableItemToggle && (
            <NewTableItemForm
              setNewTableItemToggle={setNewTableItemToggle}
              setTableData={setTableData}
            />
          )}

          <Table className="table table-stripped">
            <thead>
              <TableHeader
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
            </thead>
            <tbody>
              {computedData.map((row) => (
                <tr
                  key={Math.random()}
                  onClick={() => handleTableRowClick(row)}
                >
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {tableRowItemToggle && (
            <TableRowItem
              tableRowItemInfo={tableRowItemInfo}
              setTableRowItemInfo={setTableRowItemInfo}
              setTableRowItemToggle={setTableRowItemToggle}
            />
          )}
        </Container>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader type="TailSpin" color="#00bfff" height={300} width={300} />
        </div>
      )}
    </>
  );
};
