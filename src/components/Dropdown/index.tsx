import "./styles.css";

type DropdownProp = {
  label: string;
  options: number[];
  placeholder: string;
};
const Dropdown = ({ label, options, placeholder }: DropdownProp) => {
  return (
    <div>
      <label>{label}</label>
      <select>
        <option value="">{placeholder}</option>
        {options.map((item: any, index: number) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
