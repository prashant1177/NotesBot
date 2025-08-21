// components/Card.jsx

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-sm border-1 border-gray-900  text-gray-900 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-700 ${className}`}>{children}</p>
);

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
