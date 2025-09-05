export default function ButtonClasses(varient, className = "") {
  const base =
    "px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const buttonVariants = {
    transparent: "hover:bg-gray-100 focus:ring-gray-500",
    default: "bg-gray-900 text-gray-50 hover:bg-gray-700 focus:ring-gray-500",
    muted: "bg-gray-200 text-gray-800 hover:bg-gray-100 focus:ring-gray-50",
    primary: "bg-blue-500 text-gray-50 hover:bg-blue-600 focus:ring-blue-300",
    accent:
      "bg-orange-500 text-background hover:bg-orange-400 focus:ring-orange-300",
    outline:
      "border border-gray-400 text-gray-700 bg-transparent hover:bg-blue-100 hover:border-blue-400 hover:text-blue-400",
  };
  return `${buttonVariants[varient]} ${base} ${className}`;
}
