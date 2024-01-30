import React, { useEffect, useState } from "react";
import "./THeader.scss";
import Popup from "../../Popup/Popup";
import { connect } from "react-redux";
import { setDataTableRows, setSearchTerm } from "../../../services/actions";

const THeader = ({ columns, rows, setDataTableRows, setSearchTerm }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValues, setInputValues] = useState(null);
  

  const emptyInputValues = () => {
    let allFields = {};
    columns?.forEach((c) => (allFields[c.id] = ""));
    setInputValues(allFields);
  }

  const handleInputChange = (key, value) => {
    const newInputValues = {...inputValues};
    newInputValues[key] = value;
    setInputValues(newInputValues);
  };

  const failedValidateData = (e) => {
    // Check if any input is empty
    if (Object.values(inputValues).some((value) => value.trim() === "")) {
      setErrorMsg("One or more fields are empty");
      return true;
    } else if (rows.find((r) => r.id === inputValues.id)) {
      setErrorMsg("'Id' Already Exists");
      return true;
    }

    return false;
  };

  const saveRow = (e) => {
    e.preventDefault();

    if (failedValidateData()) return;

    setDataTableRows(inputValues);
    clearAndClose();
  };

  const clearAndClose = () => {
    emptyInputValues()
    setErrorMsg("");
    setIsPopupOpen(false);
  };

  const renderRadioInputs = (c) => (
    <>
      <label htmlFor="true">yes</label>
      <input
        id="true"
        type="radio"
        onChange={(e) => handleInputChange(c.id, e.target.value)}
        value="true"
        checked={inputValues[c.id] === "true"}
        name={c.title}
      />
      <label htmlFor="false">No</label>
      <input
        id="false"
        type="radio"
        onChange={(e) => handleInputChange(c.id, e.target.value)}
        value="false"
        checked={inputValues[c.id] === "false"}
        name={c.title}
      />
    </>
  );

  const handleDebounceSearchTerm = (e) => {
    if (timeoutId) {
      // if timeout isnt over - cancel it
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      // set new timeout
      setSearchTerm(e.target.value);
    }, 500);
    setTimeoutId(newTimeoutId); // set the id (or the refrence) to check next iteration if will be
  };

  useEffect(() => {
    emptyInputValues()
  }, [columns]);

  return (
    <div className="header-con">
      <div className="btn-con">
        <button className="btn" onClick={() => setIsPopupOpen(true)}>
          Add
        </button>
        <input
          type="text"
          className="search"
          placeholder="Search"
          onChange={(e) => handleDebounceSearchTerm(e)}
        />
        <span className="input-icon fa fa-search"></span>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => clearAndClose()}>
        <form onSubmit={saveRow}>
          {inputValues &&
            columns.map((c, index) => (
              <div className="input-con" key={index}>
                <label htmlFor={`input-${index}`}>{c.title}</label>
                {c.type === "boolean" ? (
                  renderRadioInputs(c)
                ) : (
                  <input
                    type={c.type}
                    id={`input-${index}`}
                    value={inputValues[c.id]}
                    onChange={(e) => handleInputChange(c.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          <button type="submit">Save</button>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </form>
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.columns,
  rows: state.rows,
});

const mapDispatchToProps = { setDataTableRows, setSearchTerm };

export default connect(mapStateToProps, mapDispatchToProps)(THeader);
