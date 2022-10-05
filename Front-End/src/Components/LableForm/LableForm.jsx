const LableForm = ({ children }) => {
  return (
    <label
      style={{
        fontSize: "11px",
        fontWeight: "500",
        lineHeight: "1",
        color: "#2a2e34",
        padding: "0 0 9px 2px",
      }}
    >
      {children}
    </label>
  );
};

export default LableForm;
