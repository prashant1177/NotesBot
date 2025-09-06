export default function ClassNameInput(varient, className = "") {
  const inputVariants = {
    transparent: "rounded-lg w-full p-2.5 ring-1 ring-gray-800 ",
    default:
      "rounded-lg w-full p-2.5 bg-gray-50 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    titleEditor:
      "text-3xl font-bold   pb-3   border-b-2 border-gray-100 hover:border-gray-200 focus:border-gray-400  outline-none w-full transition-colors duration-200",
    primary:
      "rounded-lg w-full p-2.5 bg-blue-500 text-gray-50 hover:bg-blue-400 focus:ring-blue-300",
    accent:
      "rounded-lg w-full p-2.5 bg-orange-500 text-background hover:bg-orange-400 focus:ring-orange-300",
       dark:
      "rounded-lg w-full p-2.5 bg-gray-800 text-gray-50 hover:bg-gray-700 focus:ring-gray-600",
  };
  return `${inputVariants[varient]} ${className}`;
}
