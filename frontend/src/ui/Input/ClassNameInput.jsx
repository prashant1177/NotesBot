export default function ClassNameInput(varient, className = "") {
  const base =
    "rounded-lg w-full p-2.5";
  const inputVariants = {
    transparent: "ring-1 ring-gray-800 ",
    default: "bg-gray-900 text-gray-50 hover:bg-gray-700 focus:ring-gray-500",
    muted: "bg-gray-200 text-gray-800 hover:bg-gray-100 focus:ring-gray-50",
    primary: "bg-blue-500 text-gray-50 hover:bg-blue-400 focus:ring-blue-300",
    accent: "bg-orange-500 text-background hover:bg-orange-400 focus:ring-orange-300",
  };
  return `${inputVariants[varient]} ${base} ${className}`;

}