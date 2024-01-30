import React, { useEffect } from "react";
import "./Row.scss";
import { connect } from "react-redux";
import { deleteDataTableRows } from "../../../services/actions";

const Row = ({
  rowData,
  columns,
  deleteDataTableRows,
  openSmallPopup,
  collapsColumns,
}) => {
  const valToDisplay = (val) => {
    if (Array.isArray(val)) return val.join(",");
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return val;
  };

  const deleteRow = () => {
    deleteDataTableRows(rowData.id);
  };

  useEffect(() => {}, [collapsColumns]);

  return (
    <div className="single-row">
      {columns.map((c) => {
        const isCollaps = collapsColumns?.indexOf(c.id) > -1;
        return (
          <div
            className="row-cell"
            key={c.id}
            style={
              isCollaps
                ? { flex: "0 0 12px", color: "transparent" }
                : { flex: `1 1 ${c.width}%` }
            }
            onClick={
              c.id === "id"
                ? null
                : (e) => openSmallPopup({ e, rowData, "key": c.id })
            }
          >
            {valToDisplay(rowData[c.id])}
          </div>
        );
      })}

      <div className="row-cell delete fa fa-trash" onClick={() => deleteRow()}>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.columns,
});
const mapDispatchToProps = { deleteDataTableRows };

export default connect(mapStateToProps, mapDispatchToProps)(Row);
