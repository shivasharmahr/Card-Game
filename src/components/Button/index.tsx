import "./styles.css";

const Button = ({ children, onClick, ...otherProps }: any) => {
  return (
    <button onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
