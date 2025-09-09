import {
  FileText,
  User,
  Edit3,
  Settings,
  Folder,
  Users,
  Download,
  AlertCircle,
  CreditCard,
  Shield,
  HelpCircle,
} from "lucide-react";

const faqData = [
  {
    slug: "account-profile",
    title: "Account & Profile",
    tag: "Account & Profile",
    icon: User,
    content:
      "Everything you need to know about creating and managing your LaTeXWriter account, updating profile information, and account settings.",
    questions: [
      {
        question: "How do I create an account on latexwriter.com?",
        answer: `To create an account on LaTeXWriter.com
Go to https://latexwriter.com/register
Enter your email, name, and password, or choose to sign in with your Google account.

If you register without using a Google account, verify your email using an OTP.

Once the verification is complete, your account will be successfully created.`,
      },
      {
        question: "Do I need an account to use the editor?",
        answer:
          "While you can try our basic editor without an account, creating a free account unlocks features like saving your work, accessing your documents from anywhere, real-time collaboration, and cloud storage for your projects.",
      },
      {
        question:
          "How can I update my profile details (email, password, display name)?",
        answer:
          "Go to Settings by clicking your profile picture in the top right corner. From there, you can update your display name, change your email address, and reset your password. Changes are saved automatically.",
      },
      {
        question: "I forgot my password – how can I reset it?",
        answer:
          "Click 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      },
      {
        question: "How do I delete my latexwriter.com account?",
        answer:
          "To delete your account, go to Settings > Account > Delete Account. This action is permanent and will remove all your documents and data. We recommend downloading your important projects before deletion.",
      },
      {
        question: "Can I use latexwriter.com without logging in?",
        answer:
          "Yes, we offer a limited guest mode where you can try basic LaTeX editing. However, your work won't be saved, and you won't have access to advanced features like collaboration, templates, or cloud storage.",
      },
    ],
  },
  {
    slug: "writing-latex",
    title: "Writing in LaTeX",
    tag: "Writing in LaTeX",
    icon: Edit3,
    content:
      "Learn how to write LaTeX code, use mathematical notation, insert figures and tables, and troubleshoot common LaTeX issues in our editor.",
    questions: [
      {
        question: "How do I start writing math in the editor?",
        answer:
          "Use dollar signs for inline math: $x^2 + y^2 = z^2$ or double dollar signs for display math: $$\\int_0^\\infty e^{-x} dx = 1$$. Our editor provides real-time preview so you can see your equations as you type.",
      },
      {
        question: "Which LaTeX commands are supported?",
        answer:
          "We support all standard LaTeX commands and most popular packages including amsmath, amsfonts, graphicx, tikz, and many more. If you need a specific package, check our package documentation or contact support.",
      },
      {
        question: "Does latexwriter.com support inline and block equations?",
        answer:
          "Yes! Use $...$ for inline equations within text, and $$...$$ or \\[...\\] for display equations on separate lines. We also support equation environments like \\begin{equation}, \\begin{align}, and \\begin{gather}.",
      },
      {
        question: "Can I insert figures, tables, and references?",
        answer:
          "Absolutely! Upload images through the file manager, create tables using tabular environments, and manage references with BibTeX. Our editor includes helpers for common elements like figures and tables.",
      },
      {
        question: "How do I add packages – are all LaTeX packages supported?",
        answer:
          "Add packages using \\usepackage{packagename} in your preamble. We support most CTAN packages. If a package isn't available, it will show in the error log, and you can request it through our support.",
      },
      {
        question: "Why is my equation not rendering properly?",
        answer:
          "Common issues include missing dollar signs, unmatched braces {}, or unsupported commands. Check the error panel below the editor for specific error messages and line numbers to debug your LaTeX code.",
      },
    ],
  },
  {
    slug: "editor-features",
    title: "Editor Features",
    tag: "Editor Features",
    icon: Settings,
    content:
      "Discover the powerful features of our LaTeX editor including real-time preview, syntax highlighting, auto-completion, and customization options.",
    questions: [
      {
        question: "What is the difference between editor and preview mode?",
        answer:
          "Editor mode shows your raw LaTeX code with syntax highlighting. Preview mode shows the compiled output as it would appear in a PDF. You can use split view to see both simultaneously or switch between them.",
      },
      {
        question: "How do I enable/disable real-time preview?",
        answer:
          "Click the preview toggle button in the toolbar, or use Ctrl+P (Cmd+P on Mac). You can also set preview preferences in Settings to auto-compile after a certain delay or only on manual trigger.",
      },
      {
        question: "Is there a dark mode in the editor?",
        answer:
          "Yes! Click the theme toggle in the top right corner or go to Settings > Appearance. We offer multiple themes including Dark, Light, and several color schemes optimized for LaTeX editing.",
      },
      {
        question: "How do I save my work while writing?",
        answer:
          "Your work auto-saves every few seconds when you're logged in. You can also manually save using Ctrl+S (Cmd+S on Mac). The save status is shown in the bottom bar of the editor.",
      },
      {
        question: "Can I undo/redo changes in the editor?",
        answer:
          "Yes, use Ctrl+Z (Cmd+Z on Mac) to undo and Ctrl+Y (Cmd+Y on Mac) to redo. We maintain a comprehensive edit history so you can revert to earlier versions of your document.",
      },
      {
        question:
          "Does latexwriter.com support auto-completion or syntax highlighting?",
        answer:
          "Yes! Our editor provides intelligent auto-completion for LaTeX commands, environments, and citations. Syntax highlighting helps you identify different parts of your code, and we show matching brackets and braces.",
      },
    ],
  },
  {
    slug: "projects-documents",
    title: "Projects & Documents",
    tag: "Projects & Documents",
    icon: Folder,
    content:
      "Manage your LaTeX projects and documents effectively with our organizational tools, file management, and project settings.",
    questions: [
      {
        question: "How can I create a new project/document?",
        answer:
          "Click 'New Project' from your dashboard. Choose from a blank document, select a template (article, report, presentation), or upload existing LaTeX files. Name your project and start writing immediately.",
      },
      {
        question: "How do I upload an existing LaTeX file to latexwriter.com?",
        answer:
          "Use 'Upload Project' from your dashboard. You can upload .tex files, images, .bib files, and other assets. Drag and drop multiple files or use the file browser. ZIP files are automatically extracted.",
      },
      {
        question: "Can I organize my documents into folders?",
        answer:
          "Yes, create folders from your dashboard to organize projects by topic, course, or any system that works for you. You can move projects between folders and create nested folder structures.",
      },
      {
        question: "How many projects can I save for free?",
        answer:
          "Free accounts can create unlimited public projects and up to 10 private projects. Premium accounts have unlimited private projects plus advanced features like priority compilation and larger file uploads.",
      },
      {
        question: "How do I rename or delete a document?",
        answer:
          "Right-click on any project in your dashboard to see options for rename, delete, duplicate, or move. You can also access these options from the project settings menu within the editor.",
      },
      {
        question: "Can I duplicate a project for editing?",
        answer:
          "Yes, right-click any project and select 'Duplicate' or 'Clone'. This creates an identical copy that you can modify without affecting the original. Useful for creating variations or templates.",
      },
    ],
  },
  {
    slug: "collaboration-sharing",
    title: "Collaboration & Sharing",
    tag: "Collaboration & Sharing",
    icon: Users,
    content:
      "Collaborate with others on LaTeX documents, share your work, and manage permissions for team projects and academic collaboration.",
    questions: [
      {
        question: "How can I share my LaTeX project with others?",
        answer:
          "Click 'Share' in your project. You can invite people by email, create shareable links, or make projects public. Set permissions for each collaborator: view-only, comment, or full edit access.",
      },
      {
        question: "Does latexwriter.com allow real-time collaboration?",
        answer:
          "Yes! Multiple users can edit the same document simultaneously. You'll see others' cursors and changes in real-time, with automatic conflict resolution and a chat feature for communication.",
      },
      {
        question: "Can I export my project as a PDF, DOCX, or image?",
        answer:
          "Yes, use the 'Download' menu to export as PDF, or individual images of pages. DOCX export is available for premium users. You can also download the raw LaTeX source and all project files.",
      },
      {
        question: "How do I share a read-only link?",
        answer:
          "In the Share dialog, select 'Create link' and choose 'View only' permissions. Anyone with this link can view your document but cannot edit it. Links can be password-protected or time-limited.",
      },
      {
        question: "Are my shared documents public or private?",
        answer:
          "Documents are private by default. Only people you explicitly share with can access them. You can choose to make documents public, which adds them to our community gallery and makes them searchable.",
      },
    ],
  },
  {
    slug: "export-download",
    title: "Export & Download",
    tag: "Export & Download",
    icon: Download,
    content:
      "Learn how to export your LaTeX documents as PDF, download project files, customize output settings, and troubleshoot compilation issues.",
    questions: [
      {
        question: "How do I export my LaTeX document as a PDF?",
        answer:
          "Click the 'PDF' button in the toolbar or use Ctrl+Enter (Cmd+Enter on Mac). The PDF compiles in the cloud and opens in a new tab. You can also schedule automatic PDF generation when you make changes.",
      },
      {
        question:
          "Can I download my project files (.tex, images, bibliography)?",
        answer:
          "Yes, use 'Download' > 'Source' to get a ZIP file with all your project files including .tex, images, .bib files, and any other assets. This lets you work offline or switch to other LaTeX editors.",
      },
      {
        question: "Do I need to install LaTeX locally to export?",
        answer:
          "No! Everything runs in the cloud. We handle the LaTeX compilation with a full TeX Live distribution, so you get professional PDF output without installing anything on your computer.",
      },
      {
        question: "Why is my PDF not compiling or showing errors?",
        answer:
          "Check the error log below the preview pane. Common issues include syntax errors, missing packages, or file path problems. The log shows line numbers and specific error messages to help you debug.",
      },
      {
        question: "Can I customize the PDF output style?",
        answer:
          "Yes, modify your document class, packages, and preamble to change the PDF appearance. We also offer quick style presets for common formats like academic papers, reports, and presentations.",
      },
    ],
  },
  {
    slug: "error-handling",
    title: "Error Handling & Debugging",
    tag: "Error Handling & Debugging",
    icon: AlertCircle,
    content:
      "Troubleshoot LaTeX compilation errors, debug common issues, and learn how to resolve problems with packages and undefined commands.",
    questions: [
      {
        question: "Why is my LaTeX code showing a compilation error?",
        answer:
          "LaTeX errors usually stem from syntax issues like unmatched braces, typos in command names, or missing packages. Check the error log for specific line numbers and error descriptions to identify the problem.",
      },
      {
        question: "How can I debug LaTeX errors in latexwriter.com?",
        answer:
          "Use our built-in error highlighting that shows problems directly in the editor. The error panel provides detailed messages with line numbers. Click on errors to jump to the problematic code location.",
      },
      {
        question: "What should I do if my document fails to render?",
        answer:
          "First, check for basic syntax errors. Try compiling a minimal document to isolate the issue. If problems persist, use 'Help' > 'Share for debugging' to get assistance from our support team.",
      },
      {
        question: "Why are some LaTeX packages not working?",
        answer:
          "We support most CTAN packages, but some may not be installed. Check the error log for 'File not found' messages. Contact support to request specific packages, and we'll typically add them within 24 hours.",
      },
      {
        question: "How do I fix 'undefined control sequence' errors?",
        answer:
          "This usually means you're using a command without loading the required package. Check if you need to add \\usepackage{} for the command, or verify the command spelling and syntax.",
      },
    ],
  },
  {
    slug: "payments-plans",
    title: "Payments & Plans",
    tag: "Payments & Plans",
    icon: CreditCard,
    content:
      "Information about pricing, subscription plans, payment methods, student discounts, and managing your premium account.",
    questions: [
      {
        question: "Is latexwriter.com free to use?",
        answer:
          "Yes! Our free plan includes unlimited public projects, up to 10 private projects, basic collaboration, and PDF export. Premium plans offer unlimited private projects, priority compilation, and advanced features.",
      },
      {
        question: "What's included in the free plan vs premium?",
        answer:
          "Free: Unlimited public projects, 10 private projects, basic templates, 1GB storage. Premium: Unlimited private projects, advanced templates, priority support, 10GB storage, advanced collaboration tools, and export options.",
      },
      {
        question: "How can I upgrade to premium?",
        answer:
          "Click 'Upgrade' in your dashboard or go to Settings > Billing. Choose monthly or annual billing (annual saves 20%). We accept credit cards, PayPal, and other payment methods.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Go to Settings > Billing > Cancel Subscription. Your premium features remain active until the current billing period ends. You can reactivate anytime without losing your data.",
      },
      {
        question: "Do you offer student discounts?",
        answer:
          "Yes! Students get 50% off premium plans. Verify your student status with your .edu email address or upload student documentation. The discount applies for up to 4 years.",
      },
      {
        question: "Which payment methods are supported?",
        answer:
          "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe with industry-standard encryption.",
      },
    ],
  },
  {
    slug: "privacy-security",
    title: "Privacy & Security",
    tag: "Privacy & Security",
    icon: Shield,
    content:
      "Learn about data privacy, document security, encryption, data retention policies, and how we protect your academic and professional work.",
    questions: [
      {
        question: "Are my LaTeX documents private by default?",
        answer:
          "Yes, all documents are private unless you explicitly choose to share them or make them public. Only you and people you invite can access your private projects.",
      },
      {
        question: "Who can access my uploaded files?",
        answer:
          "Only you and collaborators you explicitly invite have access to your files. Our support team can access files only when you specifically request help and grant permission for debugging.",
      },
      {
        question: "Is my data encrypted and secure?",
        answer:
          "Yes, all data is encrypted in transit (TLS 1.3) and at rest (AES-256). We follow industry-standard security practices and undergo regular security audits. Your documents are stored securely on AWS infrastructure.",
      },
      {
        question: "How long are my files stored?",
        answer:
          "Active accounts: indefinitely. Inactive free accounts: 12 months after last login. Premium accounts: as long as subscription is active. Deleted accounts: 30-day grace period before permanent deletion.",
      },
      {
        question: "How do I permanently delete my data from latexwriter.com?",
        answer:
          "Go to Settings > Account > Delete Account. This permanently removes all your documents, projects, and personal data within 30 days. Downloads are recommended before deletion as this action cannot be undone.",
      },
    ],
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    tag: "Technical Support",
    icon: HelpCircle,
    content:
      "Get help with technical issues, browser compatibility, performance problems, and general troubleshooting for the LaTeXWriter platform.",
    questions: [
      {
        question: "Which browsers does latexwriter.com support?",
        answer:
          "We support all modern browsers: Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For the best experience, we recommend Chrome or Firefox with JavaScript enabled and cookies allowed.",
      },
      {
        question: "Can I use latexwriter.com on mobile/tablet?",
        answer:
          "Yes! Our responsive design works on tablets and phones. While mobile editing is possible, we recommend tablets or desktops for extended LaTeX writing due to the complexity of mathematical notation.",
      },
      {
        question: "Do I need to install anything to use latexwriter.com?",
        answer:
          "No installation required! LaTeXWriter runs entirely in your web browser. Just visit our website and start writing. All LaTeX compilation happens in the cloud.",
      },
      {
        question: "Why is the editor slow or laggy?",
        answer:
          "Performance issues can stem from large documents, complex TikZ diagrams, or browser memory limits. Try splitting large documents, disabling real-time preview for complex content, or clearing your browser cache.",
      },
      {
        question: "How do I clear cache or refresh rendering?",
        answer:
          "Use Ctrl+F5 (Cmd+Shift+R on Mac) to hard refresh. For persistent issues, clear browser cache and cookies for latexwriter.com, or try incognito/private browsing mode.",
      },
      {
        question: "What should I do if the website is down?",
        answer:
          "Check our status page at status.latexwriter.com for real-time updates. Follow @LaTeXWriter on social media for announcements. If issues persist, contact support with details about the problem you're experiencing.",
      },
    ],
  },
  {
    slug: "general",
    title: "General",
    tag: "General",
    icon: FileText,
    content:
      "General information about LaTeXWriter, comparisons with other editors, templates, feature requests, and how to get support.",
    questions: [
      {
        question: "What is latexwriter.com?",
        answer:
          "LaTeXWriter is a modern, cloud-based LaTeX editor that makes it easy to write scientific documents, papers, and presentations. We offer real-time collaboration, instant preview, and professional PDF output without software installation.",
      },
      {
        question:
          "How is latexwriter.com different from Overleaf or other LaTeX editors?",
        answer:
          "LaTeXWriter focuses on user experience with faster compilation, better error handling, modern UI, and unique features like smart auto-completion and advanced collaboration tools. We also offer competitive pricing and excellent customer support.",
      },
      {
        question: "Do you provide templates for quick start?",
        answer:
          "Yes! We offer templates for academic papers (IEEE, ACM, APA), reports, presentations, CVs, and more. Access them via 'New Project' > 'From Template' or browse our template gallery for inspiration.",
      },
      {
        question: "Where can I report a bug or request a feature?",
        answer:
          "Use the 'Feedback' button in the editor or email support@latexwriter.com. For feature requests, visit our community forum where you can vote on suggestions and discuss with other users.",
      },
      {
        question: "How do I contact support?",
        answer:
          "Email support@latexwriter.com for help, use the chat widget on our website, or create a ticket in your dashboard under Help > Support. Premium users get priority response within 24 hours.",
      },
    ],
  },
];

export default faqData;
