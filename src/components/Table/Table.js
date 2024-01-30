import React, { useEffect, useState } from "react";
import { getDataTable } from "../../services/actions";
import Column from "./Column";
import "./Table.scss";
import Row from "./Row/Row";
import { connect } from "react-redux";
import THeader from "./THeader/THeader";
import SmallPopup from "./SmallPopup/SmallPopup";

const Table = ({ columns, rows, loading, getDataTable, searchTerm }) => {
  const [targetCell, setTargetCell] = useState(null);
  const [collapsColumns, setCollapsColumns] = useState([]);
  const renderColumns = () => (
    <div className="all-columns">
      {columns?.map((c) => (
        <Column
          key={c.id}
          columnData={c}
          setCollapsColumns={setCollapsColumns}
          collapsColumns={collapsColumns}
        />
      ))}
      <Column columnData={{ title: "Delete" }} />
    </div>
  );

  const filteredRows = (rows) => {
    return searchTerm.length > 2 ? rows?.filter((r) =>
          Object.values(r).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : rows;
  };

  const renderRows = () => (
    <div className="all-rows">
      {filteredRows(rows)?.map((r) => (
        <Row
          key={r.id}
          rowData={r}
          openSmallPopup={setTargetCell}
          collapsColumns={collapsColumns}
        />
      ))}
    </div>
  );

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div className="table-con">
      <THeader />
      {renderColumns()}
      {renderRows()}
      <SmallPopup targetCell={targetCell} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.columns,
  rows: state.rows,
  loading: state.loading,
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = { getDataTable };

export default connect(mapStateToProps, mapDispatchToProps)(Table);
