import ClassNameInput from "./ClassNameInput";

export default function Input({ varient= "default", children, className = "", ...props }) {
  return (
        <input className={ClassNameInput(
                (varient),
                (className)
              )}
      {...props}>
        {children}
        </input>
  );
}