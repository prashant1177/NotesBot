// components/Card.jsx

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-sm border-1 border-gray-200  text-gray-900 ${className}`} {...props}>
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
  <h3 className={`text-xl font-medium text-gray-900 leading-none tracking-tight hover:underline ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

// components/NoteCard.jsx

const NoteCard = ({ children, className = "", ...props }) => (
  <div className={`flex justify-between rounded-sm border-1 border-gray-200  text-gray-900 ${className}`} {...props}>
    {children}
  </div>
);

const NoteCardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const NoteCardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const NoteCardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-medium text-gray-900 leading-none tracking-tight hover:underline ${className}`}>{children}</h3>
);

const NoteCardAbout = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const NoteCardStats = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const DetailsCard = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col justify-between rounded-sm text-gray-900 ${className}`} {...props}>
    {children}
  </div>
);

const DetailsCardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>{children}</div>
);

const DetailsCardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const DetailsCardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-medium text-gray-900 leading-none tracking-tight hover:underline ${className}`}>{children}</h3>
);

const DetailsCardAbout = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const DetailsCardStats = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

export {DetailsCard,DetailsCardHeader,DetailsCardContent,DetailsCardTitle,DetailsCardAbout,DetailsCardStats, Card, CardHeader, CardContent, CardTitle, CardDescription, NoteCard, NoteCardHeader, NoteCardContent, NoteCardTitle, NoteCardAbout, NoteCardStats };
