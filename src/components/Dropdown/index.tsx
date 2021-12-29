import "./styles.css";

const Dropdown = ({ label, options, placeholder }: any) => {
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
