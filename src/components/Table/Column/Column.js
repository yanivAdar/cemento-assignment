import React from "react";
import "./Column.scss";

const Column = ({ columnData, setCollapsColumns, collapsColumns }) => {
  const isCollaps = collapsColumns?.indexOf(columnData.id) > -1;
  const toggleCollaps = () => {
    setCollapsColumns(
      isCollaps
        ? collapsColumns.filter((id) => id !== columnData.id)
        : [...collapsColumns, columnData.id]
    );
  };

  return (
    <div
      title={columnData.title}
      className={`single-column${isCollaps ? " collaps" : ""}`}
      style={{ flex: `1 1 ${columnData.width}%` }}
      onClick={toggleCollaps}
    >
      {columnData.title}
    </div>
  );
};

export default Column;
