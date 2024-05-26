import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent";
}

function Button({ to, children, type }: ButtonProps) {
  const btnColor = (() => {
    switch (type) {
      case "primary":
        return "bg-bgDark hover:bg-bgLight";
      case "secondary":
        return "bg-secondaryColor hover:bg-secondaryLightColor";
      case "accent":
        return "bg-accentColor hover:bg-accentLightColor";
      default:
        return "bg-bgLight";
    }
  })();

  return (
    <Link
      to={to}
      className={`${btnColor} px-4 py-2 min-w-40 text-center text-white rounded-xl shadow-md`}
    >
      {children}
    </Link>
  );
}

export default Button;
