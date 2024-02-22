// import axios from "axios";

// const configOptions = { baseURL: "/assets/init-data.json" };

// const getDataTable = () => async (dispatch) => {
//   try {
//     dispatch({ type: "TABLE_DATA_REQUEST" });

//     let columns = JSON.parse(localStorage.getItem("columns"));
//     let rows = JSON.parse(localStorage.getItem("rows"));
//     if (!columns && !rows) {
//       const response = await axios.get("", configOptions);
//       const data = response.data;
//       columns = data.columns;
//       rows = data.rows;
//       localStorage.setItem("columns", JSON.stringify(data.columns));
//       localStorage.setItem("rows", JSON.stringify(data.rows));
//     }
//     dispatch({ type: "TABLE_DATA_SUCCESS", payload: { columns, rows } });
//   } catch (error) {
//     dispatch({ type: "TABLE_DATA_FAILURE", payload: error.message });
//   }
// };

// const setDataTableRows = (rowData) => async (dispatch) => {
//   try {
//     dispatch({ type: "ROW_DATA_REQUEST" });
//     const rows = JSON.parse(localStorage.getItem("rows"));
//     const updatedRows = [...rows, rowData];
//     localStorage.setItem("rows", JSON.stringify(updatedRows));
//     dispatch({ type: "ROW_DATA_SUCCESS", payload: updatedRows });
//   } catch (error) {
//     dispatch({ type: "ROW_DATA_FAILURE", payload: error.message });
//   }
// };

// const updateDataTableRows = (rowData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UPDATE_ROW_DATA_REQUEST" });
//     const rows = JSON.parse(localStorage.getItem("rows"));
//     const updatedRows = rows.map(r => r.id === rowData.id ? rowData : r);
//     localStorage.setItem("rows", JSON.stringify(updatedRows));
//     dispatch({ type: "UPDATE_ROW_DATA_SUCCESS", payload: updatedRows });
//   } catch (error) {
//     dispatch({ type: "UPDATE_ROW_DATA_FAILURE", payload: error.message });
//   }
// };

// const deleteDataTableRows = (rowDataId) => async (dispatch) => {
//   try {
//     dispatch({ type: "DELETE_ROW_DATA_REQUEST" });
//     const rows = JSON.parse(localStorage.getItem("rows"));
//     const updatedRows = [...rows.filter(r => r.id !== rowDataId)];
//     localStorage.setItem("rows", JSON.stringify(updatedRows));
//     dispatch({ type: "DELETE_ROW_DATA_SUCCESS", payload: updatedRows });
//   } catch (error) {
//     dispatch({ type: "DELETE_ROW_DATA_FAILURE", payload: error.message });
//   }
// };

// const setSearchTerm = (searchTerm) => async (dispatch) => {
//   dispatch({ type: "SEARCH_TERM", payload: searchTerm });
// };

// export { getDataTable, setDataTableRows, deleteDataTableRows, updateDataTableRows, setSearchTerm };


import axios from "axios";

// Action Types
const TABLE_DATA_REQUEST = "TABLE_DATA_REQUEST";
const TABLE_DATA_SUCCESS = "TABLE_DATA_SUCCESS";
const TABLE_DATA_FAILURE = "TABLE_DATA_FAILURE";

const ROW_DATA_REQUEST = "ROW_DATA_REQUEST";
const ROW_DATA_SUCCESS = "ROW_DATA_SUCCESS";
const ROW_DATA_FAILURE = "ROW_DATA_FAILURE";

const UPDATE_ROW_DATA_REQUEST = "UPDATE_ROW_DATA_REQUEST";
const UPDATE_ROW_DATA_SUCCESS = "UPDATE_ROW_DATA_SUCCESS";
const UPDATE_ROW_DATA_FAILURE = "UPDATE_ROW_DATA_FAILURE";

const DELETE_ROW_DATA_REQUEST = "DELETE_ROW_DATA_REQUEST";
const DELETE_ROW_DATA_SUCCESS = "DELETE_ROW_DATA_SUCCESS";
const DELETE_ROW_DATA_FAILURE = "DELETE_ROW_DATA_FAILURE";

const SEARCH_TERM = "SEARCH_TERM";

// Config Options
const configOptions = { baseURL: "/assets/init-data.json" };

// Action Creators
const tableDataRequest = () => ({ type: TABLE_DATA_REQUEST });
const tableDataSuccess = (columns, rows) => ({ type: TABLE_DATA_SUCCESS, payload: { columns, rows } });
const tableDataFailure = (error) => ({ type: TABLE_DATA_FAILURE, payload: error.message });

const rowDataRequest = () => ({ type: ROW_DATA_REQUEST });
const rowDataSuccess = (updatedRows) => ({ type: ROW_DATA_SUCCESS, payload: updatedRows });
const rowDataFailure = (error) => ({ type: ROW_DATA_FAILURE, payload: error.message });

const updateRowDataRequest = () => ({ type: UPDATE_ROW_DATA_REQUEST });
const updateRowDataSuccess = (updatedRows) => ({ type: UPDATE_ROW_DATA_SUCCESS, payload: updatedRows });
const updateRowDataFailure = (error) => ({ type: UPDATE_ROW_DATA_FAILURE, payload: error.message });

const deleteRowDataRequest = () => ({ type: DELETE_ROW_DATA_REQUEST });
const deleteRowDataSuccess = (updatedRows) => ({ type: DELETE_ROW_DATA_SUCCESS, payload: updatedRows });
const deleteRowDataFailure = (error) => ({ type: DELETE_ROW_DATA_FAILURE, payload: error.message });

const searchTermAction = (searchTerm) => ({ type: SEARCH_TERM, payload: searchTerm });

// Thunks
const getDataTable = () => async (dispatch) => {
  try {
    dispatch(tableDataRequest());

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

    dispatch(tableDataSuccess(columns, rows));
  } catch (error) {
    dispatch(tableDataFailure(error));
  }
};

const setDataTableRows = (rowData) => async (dispatch) => {
  try {
    dispatch(rowDataRequest());
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = [...rows, rowData];
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch(rowDataSuccess(updatedRows));
  } catch (error) {
    dispatch(rowDataFailure(error));
  }
};

const updateDataTableRows = (rowData) => async (dispatch) => {
  try {
    dispatch(updateRowDataRequest());
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = rows.map((r) => (r.id === rowData.id ? rowData : r));
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch(updateRowDataSuccess(updatedRows));
  } catch (error) {
    dispatch(updateRowDataFailure(error));
  }
};

const deleteDataTableRows = (rowDataId) => async (dispatch) => {
  try {
    dispatch(deleteRowDataRequest());
    const rows = JSON.parse(localStorage.getItem("rows"));
    const updatedRows = [...rows.filter((r) => r.id !== rowDataId)];
    localStorage.setItem("rows", JSON.stringify(updatedRows));
    dispatch(deleteRowDataSuccess(updatedRows));
  } catch (error) {
    dispatch(deleteRowDataFailure(error));
  }
};

const setSearchTerm = (searchTerm) => async (dispatch) => {
  dispatch(searchTermAction(searchTerm));
};

export {
  getDataTable,
  setDataTableRows,
  deleteDataTableRows,
  updateDataTableRows,
  setSearchTerm,
  // Exporting action types for possible use in reducers or other parts of the application
  TABLE_DATA_REQUEST,
  TABLE_DATA_SUCCESS,
  TABLE_DATA_FAILURE,
  ROW_DATA_REQUEST,
  ROW_DATA_SUCCESS,
  ROW_DATA_FAILURE,
  UPDATE_ROW_DATA_REQUEST,
  UPDATE_ROW_DATA_SUCCESS,
  UPDATE_ROW_DATA_FAILURE,
  DELETE_ROW_DATA_REQUEST,
  DELETE_ROW_DATA_SUCCESS,
  DELETE_ROW_DATA_FAILURE,
  SEARCH_TERM,
};
