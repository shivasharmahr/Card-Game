const MultipleOption = ({ optionValueArray }: any) => {
  const options = optionValueArray.map((num: any) => {
    return (
      <option key={num} value={num}>
        {num}
      </option>
    );
  });

  return options;
};

export default MultipleOption;
