import { useState } from "react";
import MultipleOption from "./MultipleOption";

const UserInput = ({ handleInput, optionValueArray }: any) => {
  const [placeHolder, setPlaceHolder] = useState("Your name please....");
  const [defaultSelect, setDefaultSelect] = useState(
    "Please select the Number"
  );

  const handlevalidInput = (e: any) => {
    if (!e.target[0].value) {
      e.preventDefault();
      setPlaceHolder("You have to Enter Your Name To continue");
    } else if (!e.target[1].value) {
      e.preventDefault();
      setDefaultSelect("You have to select the Number");
    } else {
      handleInput(e);
    }
  };

  return (
    <form className="inputContainer" onSubmit={handlevalidInput}>
      <input type="text" placeholder={placeHolder} autoFocus={true} />
      <label htmlFor="selectNumber">Select A Number</label>
      <select>
        <option value="">{defaultSelect}</option>
        <MultipleOption optionValueArray={optionValueArray}></MultipleOption>
      </select>
      <button value="submit">Play</button>
    </form>
  );
};

export default UserInput;
