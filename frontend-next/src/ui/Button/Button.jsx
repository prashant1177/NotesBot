import ButtonClasses from "./ButtonClasses";
export default function Button({
  children,
  onClick,
  varient= "default",
  className = "",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={ButtonClasses(
        (varient),
        (className)
      )}
      {...props}
    >
      {children}
    </button>
  );
}
