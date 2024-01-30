
const initialState = {
  columns: null,
  rows: null,
  loading: false,
  error: null,
  searchTerm: ''
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TABLE_DATA_REQUEST":
      return { ...state, loading: true, error: null };

    case "TABLE_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        columns: action.payload.columns,
        rows: action.payload.rows,
      };

    case "TABLE_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ROW_DATA_REQUEST":
      return { ...state, loading: true, error: null };

    case "ROW_DATA_SUCCESS":
      return { ...state, loading: false, rows: action.payload };

    case "ROW_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_ROW_DATA_REQUEST":
      return { ...state, loading: true, error: null };

    case "UPDATE_ROW_DATA_SUCCESS":
      return { ...state, loading: false, rows: action.payload };

    case "UPDATE_ROW_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_ROW_DATA_REQUEST":
      return { ...state, loading: true, error: null };

    case "DELETE_ROW_DATA_SUCCESS":
      return { ...state, loading: false, rows: action.payload };

    case "DELETE_ROW_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SEARCH_TERM":
      return { ...state, searchTerm: action.payload};

    default:
      return state;
  }
};

export default dataReducer;
