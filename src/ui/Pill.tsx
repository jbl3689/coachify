function Pill({ children, type }) {
  const btnColor = (() => {
    switch (type) {
      case "primary":
        return "bg-primaryBase hover:bg-primaryLight";
      case "secondary":
        return "bg-secondaryBase hover:bg-secondaryLight";
      case "accent":
        return "bg-accentBase hover:bg-accentLight";
      case "danger":
        return "bg-dangerBase hover:bg-dangerLight";
      default:
        return "bg-bgTertiary";
    }
  })();

  return (
    <span
      className={`${btnColor} px-5 py-3 min-w-32 text-center text-textBase rounded-3xl shadow-md`}
    >
      {children}
    </span>
  );
}

export default Pill;
