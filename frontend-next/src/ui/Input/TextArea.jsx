import ClassNameInput from "./ClassNameInput";
export default function TextArea({ varient= "default", children, className = "", ...props }) {
  return (
        <textarea className={ClassNameInput(
                (varient),
                (className)
              )}
      {...props}>
        {children}
        </textarea>
  );
}