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
        answer: `<p className="text-gray-700 mb-4 leading-relaxed">
  To create an account on LaTeXWriter.com, go to 
  <a href="https://latexwriter.com/register" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">latexwriter.com/register</a>. 
  Enter your email address, name, and password, or choose to sign in with your Google account. 
  If you register without using Google, verify your email by entering the one-time password (OTP) sent to you. 
  After verification is complete, your account will be successfully created.
</p>

<ol className="list-decimal list-inside text-gray-700 space-y-2">
  <li>Visit <a href="https://latexwriter.com/register" target="_blank" rel="noopener noreferrer"  className="font-medium">https://latexwriter.com/register</a>.</li>
  <li>Fill in your email, name, and password — or click <span className="font-medium">Sign in with Google</span>.</li>
  <li>If you used email/password, check your inbox for the OTP and enter it to verify your email.</li>
  <li>Once verified, your LaTeXWriter account is ready to use.</li>
</ol>`,
      },
      {
        question: "Do I need an account to use the editor?",
        answer: `<p className="text-gray-700 leading-relaxed">
  Yes, you need to have an account to use the editor. This requirement helps us securely store and manage your files, 
  ensuring your data is safely maintained and accessible only to you.
</p>

`,
      },
      {
        question:
          "How can I update my profile details (email, password, display name)?",
        answer: `
<p>
  You can update your profile details such as your display name and password. However, for security and consistency, 
  you cannot change your email address or username once your account has been created.
</p>`,
      },
      {
        question: "I forgot my password – how can I reset it?",
        answer:
          "<p>Click 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.</p>",
      },
      {
        question: "How do I delete my latexwriter.com account?",
        answer:
          "<p>To delete your account, go to Sidebar > Account > Delete Account. This action is permanent and will remove all your documents and data. We recommend downloading your important projects before deletion.</p>",
      },
      {
        question: "Can I use latexwriter.com without logging in?",
        answer: `<p>
  No, you cannot use LaTeXWriter as a guest. However, if a project is shared with you in view mode, you will be able to view its contents such as files.
</p>`,
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
        answer: `<p className=" leading-relaxed">
  Use dollar signs for inline math, for example: <span className="font-mono">$x^2 + y^2 = z^2$</span>, 
  or double dollar signs for display math, for example: 
  <span className="font-mono">$$\int_0^\infty e^{-x} \, dx = 1$$</span>. 
  Our editor provides a real-time preview so you can see your equations as you type.
</p>`,
      },
      {
        question: "Which LaTeX commands are supported?",
        answer: `<p className=" leading-relaxed">
  All standard LaTeX commands are supported in the editor, except for a few outdated or deprecated ones that are not
  maintained by modern compilers like Tectonic. Commonly used math, text formatting, tables, and figures are fully
  supported.
</p>`,
      },
      {
        question: "Does latexwriter.com support inline and block equations?",
        answer: `<p className="leading-relaxed">
  Yes, LaTeXWriter.com supports both inline and block equations, giving you the flexibility to format your mathematical content the way you need. Inline equations are useful when you want to include math seamlessly within a line of text.
</p>

<p className="leading-relaxed">
  Block equations, on the other hand, are displayed separately and centered, making them ideal for highlighting important formulas or longer mathematical expressions. You can use both styles depending on your document’s requirements.
</p>`,
      },
      {
        question: "Can I insert figures, tables, and references?",
        answer: `
<p className="leading-relaxed">
  Yes, you can easily insert figures, tables, and references with just one click. The toolbar provides ready-made syntax for adding these elements, so you only need to edit them as per your requirements.
</p>`,
      },
      {
        question: "How do I add packages – are all LaTeX packages supported?",
        answer: `<p className="leading-relaxed">
  You do not need to manually install any packages. Simply include them at the top of your document using 
  <span className="font-mono">\\usepackage{...}</span>, and everything will be handled for you in the backend.
</p>

<p className="leading-relaxed">
  LaTeXWriter supports all standard packages, except for a few deprecated ones that are outdated and no longer useful.
</p>`,
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
        answer: `<p className="leading-relaxed">
  The <span className="font-medium">Editor mode</span> is powered by the Visual Studio Monaco editor and is designed for creating and managing your project files such as <span className="font-mono">.tex</span> and <span className="font-mono">.bib</span>. In this mode, you have full access to write, edit, and organize your LaTeX documents. Only the project owner has permission to make changes, ensuring that your content remains secure and under your control. This mode is best suited for actively working on your LaTeX projects and making updates in real time.
</p>

<p className="leading-relaxed">
  The <span className="font-medium">Preview mode</span>, on the other hand, is intended for sharing your project with others. When you share a project in preview mode, recipients can view your files and compiled output but cannot make any edits. This makes it useful for collaboration when you only want others to review or reference your work without altering the original files. In the future, LaTeXWriter plans to introduce a true collaboration feature, similar to how GitHub allows multiple contributors to work together, where team members will be able to edit and contribute in a controlled way.
</p>`,
      },
      {
        question: "How do I enable/disable real-time preview?",
        answer: `<p className="leading-relaxed">
  You can enable or disable real-time preview simply by switching to another tab. The editor will continue to compile your files into PDF in the background, so disabling the preview does not affect your editing process.
</p>

<p className="leading-relaxed">
  This means you can work without distraction and save system resources if you don’t need to see the live preview. When you’re ready, just switch back to the preview tab to view the compiled output.
</p>`,
      },
      {
        question: "Is there a dark mode in the editor?",
        answer: `<p className="leading-relaxed">
  No, currently there is no dark mode available in the editor. However, a dark mode feature is planned for the future, possibly by the first week of October.
</p>`,
      },
      {
        question: "How do I save my work while writing?",
        answer: `<p className="leading-relaxed">
  Your work is automatically saved every few seconds while you are logged in. You can also manually save your files by going to the file structure and selecting "Save." The save status is displayed in the bottom bar of the editor so you can always see when your changes have been recorded.
</p>`,
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
      {
        question: "What is commit changes?",
        answer: `<p className="leading-relaxed">
    By committing changes, you save the current state of your project permanently. Free users can save up to 5 commits; if you create more, the oldest commits will be removed. Premium users can save up to 50 commits.
  </p>`,
      },
      {
        question: "How do I commit my current version?",
        answer: `<p className="leading-relaxed">
    You can click on "Commit Changes" to save the current version of your file permanently. This allows you to go back to this version at any time.
  </p>`,
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
`<p className="leading-relaxed">
  Click "Create New Project" from your dashboard. Enter a title for your project, and optionally add an "About" description and relevant topics. Then click "Create Project." Your project will be created instantly, and you can start writing immediately.
</p>`      },
      {
        question: "How do I upload an existing LaTeX file to latexwriter.com?",
        answer:
          "Use 'Upload File' from your dashboard. You can upload .tex files, images, .bib files, and other assets. Drag and drop files or use the file browser.",
      },
      {
        question: "Can I organize my documents into folders?",
        answer:
        `<p className="leading-relaxed">
  Yes, by default a file structure is provided with a <span className="font-mono">main.tex</span> file. You can add new files or delete existing ones as needed to organize your project.
</p>`
      },
      {
        question: "How many projects can I save for free?",
        answer:
          "Free accounts can create 1 private projects. Premium accounts have unlimited private projects plus advanced features like priority compilation and larger file uploads.",
      },
      {
        question: "Can I duplicate a project for editing?",
        answer:
`<p className="leading-relaxed">
  Yes, by going to the project view, you can fork your own project. This will simply duplicate the project, allowing you to make changes without affecting the original.
</p>`      },
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
        question: "Can I export my project as a PDF?",
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
`<p className="leading-relaxed">
  To export your LaTeX document as a PDF, go to the "View PDF" section, where you will find an option to download the PDF. This will always download the final compiled version. 
</p>

<p className="leading-relaxed">
  If you want to print the PDF, turn off Preview mode. The final PDF will then be visible along with the print option.
</p`      },
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
`<p className="leading-relaxed">
  Any LaTeX errors will be clearly displayed in the editor, helping you save time by quickly identifying issues. 
</p>

<p className="leading-relaxed">
  If you don’t understand an error, you can click on the "Error Assistant." It will explain the error in simple language, although it may take 2-3 seconds to generate the explanation.
</p>`      },
      {
        question: "What should I do if my document fails to render?",
        answer:
          "First, check for basic syntax errors. Try compiling a minimal document to isolate the issue. If problems persist, use 'Ask Gemini' > 'paste the error' to get assistance from our AI-Assitant.",
      },
      {
        question: "Why are some LaTeX packages not working?",
        answer:
        `<p className="leading-relaxed">
  LaTeXWriter supports all modern packages using XeLaTeX. However, some older or deprecated packages may not work. 
</p>

<p className="leading-relaxed">
  If you encounter such an issue, you can reach out to us. If the package exists, we will make sure to add support for it as soon as possible.
</p>`
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
`<p className="leading-relaxed">
  Mostly yes, LaTeXWriter has a free version that allows you to create one project without any limitations. 
</p>

<p className="leading-relaxed">
  To create more than one project or access additional features, you will need to upgrade to the premium version.
</p>`      },
      {
        question: "What's included in the free plan vs premium?",
        answer:
`<p className="leading-relaxed">
  The free plan includes almost all features of LaTeXWriter, with the main limitation being that you can create only one project. Free users can save up to 5 commits per project.
</p>

<p className="leading-relaxed">
  Premium users enjoy additional benefits, such as faster compilation speed due to a priority queue, the ability to save up to 50 commits, and the option to compile projects directly in the view mode without opening the editor. Premium plans also include several other advanced features to enhance the editing and sharing experience.
</p>`      },
      {
        question: "How can I upgrade to premium?",
        answer:
`<p className="leading-relaxed">
  To upgrade to premium, go to the "Premium" tab and click on "Get Premium." Complete the payment of ₹799 or $9, and all premium features will become available to you immediately.
</p>`      },
      {
        question: "How do I cancel my subscription?",
        answer:
`<p className="leading-relaxed">
  To cancel your subscription, go to your user settings where you will find a "Cancel" option. Click it to complete the cancellation. For confirmation, you can also send an email to the support team.
</p>`      },
      {
        question: "Which payment methods are supported?",
        answer:
`<p className="leading-relaxed">
  Payments are handled securely through Razorpay. You can use any debit card, credit card, or UPI, including both international and domestic cards.
</p>`      },
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
          "Active accounts: indefinitely. Inactive free accounts: 6 months after last login. Premium accounts: as long as subscription is active. Deleted accounts: 30-day grace period before permanent deletion.",
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
          "Follow @LaTeXWriter on social media for announcements. If issues persist, contact support with details about the problem you're experiencing.",
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
        question: "Where can I report a bug or request a feature?",
        answer:
`<p className="leading-relaxed">
  You can report a bug or request a feature by visiting our Reddit page or tagging us on X, and you will typically receive a reply within 2-3 hours. 
  Alternatively, you can email us directly at <a href="mailto:support@latexwriter.com" className="underline">support@latexwriter.com</a>.
</p>`      },
      {
        question: "How do I contact support?",
        answer:
          "Email support@latexwriter.com for help, Premium users get priority response within 6 hours.",
      },
    ],
  },
];

export default faqData;
