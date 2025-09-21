
const Blank = " ";
const Letter = String.raw`\documentclass[12pt]{letter} % Letter class, 12pt font

% ----- Packages -----
\usepackage{fontspec}       % XeLaTeX font support
\usepackage{geometry}       % Page margins
\usepackage{setspace}       % Line spacing
\usepackage{hyperref}       % Hyperlinks

% ----- Page setup -----
\geometry{
    left=25mm,
    right=25mm,
    top=25mm,
    bottom=25mm
}

\setmainfont{Times New Roman} % Main font (requires system font)
\onehalfspacing               % 1.5 line spacing

% ----- Recipient and Sender -----
\signature{Your Name} % Signature at the end
\address{Your Address Line 1 \\ City, State, ZIP \\ Email: your@email.com}

\begin{document}

\begin{letter}{Recipient Name \\ Recipient Address Line 1 \\ City, State, ZIP}

\opening{Dear Recipient Name,}

I hope this letter finds you well. % Introductory sentence

% ----- Body of the letter -----
This is a sample letter written using the LaTeX \texttt{letter} class. You can write multiple paragraphs here. For example:

\begin{itemize}
    \item First point or paragraph.
    \item Second point or paragraph.
\end{itemize}

You can also include references to documents, attachments, or links using \href{https://latexwriter.com}{hyperlinks}.

% ----- Closing -----
\closing{Sincerely,}

% Optional postscript
\ps{P.S. This is an optional postscript.}

% Optional enclosures
\encl{Document 1 \\ Document 2}

\end{letter}

\end{document}

`;

const Book = String.raw`\documentclass[12pt,openany]{book} % Book class, 12pt font, chapters can start on any page

% ----- Packages -----
\usepackage{fontspec}         % XeLaTeX font support
\usepackage{geometry}         % Page margins
\usepackage{setspace}         % Line spacing
\usepackage{graphicx}         % Include images
\usepackage{hyperref}         % Hyperlinks
\usepackage{amsmath, amssymb} % Math symbols
\usepackage{lipsum}           % Sample text (can remove later)
\usepackage{titlesec}         % Custom section spacing

% ----- Page setup -----
\geometry{
    left=30mm,
    right=30mm,
    top=30mm,
    bottom=30mm
}

\setmainfont{Times New Roman} % Main font (requires system font)
\onehalfspacing               % 1.5 line spacing

% ----- Section formatting -----
\titleformat{\chapter}[block]{\LARGE\bfseries}{\thechapter}{1em}{}
\titleformat{\section}[block]{\large\bfseries}{\thesection}{1em}{}

% ----- Document -----
\title{Your Book Title Here}
\author{Author Name}
\date{\today} % Or specify a date

\begin{document}

\frontmatter
\maketitle

\chapter*{Dedication}
\lipsum[1]

\chapter*{Preface}
\lipsum[2]

\tableofcontents
\mainmatter

\chapter{Introduction}
\lipsum[3]

\chapter{Chapter One}
\section{Section 1.1}
\lipsum[4]
\section{Section 1.2}
\lipsum[5]

\chapter{Chapter Two}
\section{Section 2.1}
\lipsum[6]

\chapter{Chapter Three}
\section{Section 3.1}
\lipsum[7]

\chapter{Conclusion}
\lipsum[8]

\backmatter
\chapter*{References}
\begin{itemize}
    \item Author A., Author B. \textit{Title of Paper}. Journal Name, Year.
    \item Author C. \textit{Book Title}. Publisher, Year.
\end{itemize}

\end{document}

`;

const Report = String.raw`\documentclass[12pt,a4paper]{report} % Report class, 12pt font

% ----- Packages -----
\usepackage{fontspec}       % XeLaTeX font support
\usepackage{geometry}       % Page margins
\usepackage{setspace}       % Line spacing
\usepackage{graphicx}       % Include images
\usepackage{hyperref}       % Hyperlinks
\usepackage{amsmath, amssymb} % Math symbols
\usepackage{lipsum}         % Sample text (can remove later)
\usepackage{titlesec}       % Custom section spacing

% ----- Page setup -----
\geometry{
    left=25mm,
    right=25mm,
    top=25mm,
    bottom=25mm
}

\setmainfont{Times New Roman} % Main font (requires system font)
\onehalfspacing               % 1.5 line spacing

% ----- Section formatting (optional) -----
\titleformat{\chapter}[block]{\LARGE\bfseries}{\thechapter}{1em}{}
\titleformat{\section}[block]{\large\bfseries}{\thesection}{1em}{}

% ----- Document -----
\title{Your Report Title Here}
\author{Author Name}
\date{\today} % Or specify a date

\begin{document}

\maketitle

\begin{abstract}
Write a brief abstract summarizing your report. Usually 3–5 sentences.
\end{abstract}

\tableofcontents
\newpage

\chapter{Introduction}
\lipsum[1]

\chapter{Literature Review}
\lipsum[2]

\chapter{Methodology}
\lipsum[3]

\chapter{Results}
\lipsum[4]

\chapter{Discussion}
\lipsum[5]

\chapter{Conclusion}
\lipsum[6]

\chapter*{References}
\begin{itemize}
    \item Author A., Author B. \textit{Title of Paper}. Journal Name, Year.
    \item Author C. \textit{Book Title}. Publisher, Year.
\end{itemize}

\end{document}

`;

const Article = String.raw`\documentclass[12pt]{article} % Article class, 12pt font

% ----- Packages -----
\usepackage{fontspec}       % XeLaTeX font support
\usepackage{geometry}       % Page margins
\usepackage{setspace}       % Line spacing
\usepackage{graphicx}       % Include images
\usepackage{hyperref}       % Hyperlinks
\usepackage{amsmath, amssymb} % Math symbols
\usepackage{lipsum}         % Sample text (can remove later)

% ----- Page setup -----
\geometry{
    a4paper,
    left=25mm,
    right=25mm,
    top=25mm,
    bottom=25mm
}

\onehalfspacing               % 1.5 line spacing

% ----- Document -----
\title{Your Article Title Here}
\author{Author Name}
\date{\today} % Or specify a date

\begin{document}

\maketitle

\begin{abstract}
Write your abstract here. Summarize the main points of your article in 3-5 sentences.
\end{abstract}

\section{Introduction}
\lipsum[1] % Sample placeholder text, replace with your content

\section{Methodology}
\lipsum[2]

\section{Results}
\lipsum[3]

\section{Discussion}
\lipsum[4]

\section{Conclusion}
\lipsum[5]

\section*{References}
% Example references, replace with your own
\begin{itemize}
    \item Author A., Author B. \textit{Title of Paper}. Journal Name, Year.
    \item Author C. \textit{Book Title}. Publisher, Year.
\end{itemize}

\end{document}
`;

module.exports = { Book, Letter, Article, Report, Blank };
