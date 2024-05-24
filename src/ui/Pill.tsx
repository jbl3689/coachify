function Pill({ children, type }) {
  const btnColor = (() => {
    switch (type) {
      case "primary":
        return "bg-bgDark hover:bg-bgLight";
      case "secondary":
        return "bg-secondaryColor hover:bg-secondaryLightColor";
      case "accent":
        return "bg-accentColor hover:bg-accentLightColor";
      case "danger":
        return "bg-dangerColor hover:bg-dangerLightColor";
      default:
        return "bg-bgLight";
    }
  })();

  return (
    <span
      className={`${btnColor} px-5 py-3 min-w-32 text-center text-white rounded-3xl shadow-md`}
    >
      {children}
    </span>
  );
}

export default Pill;
