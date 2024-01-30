import axios from "axios";

const configOptions = { baseURL: "/assets/init-data.json" };

const getDataTable = () => async (dispatch) => {
  try {
    dispatch({ type: "TABLE_DATA_REQUEST" });

    let columns = JSON.parse(localStorage.getItem("columns"));
    let rows = JSON.parse(localStorage.getItem("rows"));
    if (!columns && !rows) {
      const response = await axios.get("", configOptions);
      const data = response.data;
      columns = data.columns;
      rows = data.rows;
      localStorage.setItem("columns", JSON.stringify(data.columns));
      localStorage.setItem("rows", JSON.stringify(data.rows));
    }
    console.log({ data: { columns, rows } });
    dispatch({ type: "TABLE_DATA_SUCCESS", payload: { columns, rows } });
  } catch (error) {
    dispatch({ type: "TABLE_DATA_FAILURE", payload: error.message });
  }
};

const setDataTableRows = (rowData) => async (dispatch) => {
  try {
    dispatch({ type: "ROW_DATA_REQUEST" });
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = [...rows, rowData];
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch({ type: "ROW_DATA_SUCCESS", payload: updatedRows });
  } catch (error) {
    dispatch({ type: "ROW_DATA_FAILURE", payload: error.message });
  }
};

const updateDataTableRows = (rowData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ROW_DATA_REQUEST" });
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = rows.map(r => r.id === rowData.id ? rowData : r);
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch({ type: "UPDATE_ROW_DATA_SUCCESS", payload: updatedRows });
  } catch (error) {
    dispatch({ type: "UPDATE_ROW_DATA_FAILURE", payload: error.message });
  }
};

const deleteDataTableRows = (rowDataId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ROW_DATA_REQUEST" });
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = [...rows.filter(r => r.id !== rowDataId)];
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch({ type: "DELETE_ROW_DATA_SUCCESS", payload: updatedRows });
  } catch (error) {
    dispatch({ type: "DELETE_ROW_DATA_FAILURE", payload: error.message });
  }
};

const setSearchTerm = (searchTerm) => async (dispatch) => {
  dispatch({ type: "SEARCH_TERM", payload: searchTerm });
};

export { getDataTable, setDataTableRows, deleteDataTableRows, updateDataTableRows, setSearchTerm };
