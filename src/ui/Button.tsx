import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent" | "danger";
  onClick?: () => void;
}

function Button({ to, children, type, onClick }: ButtonProps) {
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
        return "bg-bg4";
    }
  })();

  return (
    <Link
      to={to as string}
      className={`${btnColor} px-4 py-2 min-w-40 text-center text-white rounded-xl shadow-md`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default Button;
