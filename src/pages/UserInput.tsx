import { useState } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { optionValueArray } from "../constants";

const UserInput = ({ handleInput }: any) => {
  const [isInputError, setInputError] = useState(false);
  const [isDropdownError, setDropdownError] = useState(false);

  const handleValidInput = (e: any) => {
    if (!e.target[0].value) {
      e.preventDefault();
      setInputError(true);
    } else if (!e.target[1].value) {
      e.preventDefault();
      setDropdownError(true);
    } else {
      handleInput(e);
    }
  };

  return (
    <form className="inputContainer" onSubmit={handleValidInput}>
      <input
        type="text"
        placeholder={
          isInputError
            ? "You have to enter your name to continue"
            : "Please enter your name"
        }
        autoFocus={true}
      />
      <Dropdown
        label={"Select a number"}
        placeholder={
          isDropdownError ? "You have to select the number" : "Select a number"
        }
        options={optionValueArray}
      />
      <Button value="submit">Play</Button>
    </form>
  );
};

export default UserInput;
