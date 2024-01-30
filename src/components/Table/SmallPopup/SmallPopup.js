import React, { useEffect, useRef, useState } from "react";
import "./SmallPopup.scss";
import { connect } from "react-redux";
import { updateDataTableRows } from "../../../services/actions";

const SmallPopup = ({ targetCell, updateDataTableRows }) => {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [smallPopupDetails, setSmallPopupDetails] = useState({
    isOpen: false,
    top: 0,
    left: 0,
  });

  const updateValue = (value) => {
    setInputVal(value.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (targetCell?.e.target.textContent !== inputVal) {
        updateDataTableRows({
          ...targetCell.rowData,
          [targetCell.key]: inputVal,
        });
      }
      setSmallPopupDetails({ ...smallPopupDetails, isOpen: false });
    }
  };

  useEffect(() => {
    if (!targetCell?.e) return;
    setSmallPopupDetails({
      top: targetCell?.e.target.offsetTop + 35,
      left: targetCell?.e.target.offsetLeft,
      isOpen: true,
    });

    setInputVal(targetCell?.e.target.textContent);
    requestAnimationFrame(() => inputRef.current.focus())
  }, [targetCell]);

  return (
    <div
      className={`small-popup ${smallPopupDetails.isOpen ? "open" : ""}`}
      style={{ top: smallPopupDetails.top, left: smallPopupDetails.left }}
      onKeyDown={handleEnterKeyPress}
    >
      <input
        onChange={(e) => updateValue(e)}
        value={inputVal}
        ref={inputRef}
        onBlur={() =>
          setSmallPopupDetails({ ...smallPopupDetails, isOpen: false })
        }
      />
    </div>
  );
};
const mapDispatchToProps = { updateDataTableRows };
export default connect(null, mapDispatchToProps)(SmallPopup);
