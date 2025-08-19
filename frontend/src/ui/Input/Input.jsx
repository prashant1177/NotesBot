export default function Input({ children, className = ""}) {
  return (
    <input
    className={className} 
    >
      {children}
    </input>
  );
}