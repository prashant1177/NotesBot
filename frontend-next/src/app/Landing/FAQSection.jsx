import Badge from "@/ui/Badge/Badge";

const faqs = [
  {
    question:
      "Why should I use LaTeXWriter instead of Overleaf or other LaTeX editors?",
    answer: `Other editors either provide online compilation, which often causes timeouts and slower performance, or they lack collaboration features. Offline editors, on the other hand, usually have a complicated UI that is hard to understand. LaTeXWriter solves this by offering fast offline compilation directly on your computer along with seamless collaboration for unlimited collaborators.`,
  },
  {
    question: "Do I need to install anything to use LaTeXWriter?",
    answer: `You only need to install the LaTeXWriter setup file, which is less than 150 MB. Apart from this, nothing else is required. All the necessary packages will be installed automatically the first time you use them in your file and compile.`,
  },
  {
    question: "Does LaTeXWriter support real-time PDF compilation?",
    answer: `Yes, LaTeXWriter supports real-time PDF compilation. You can preview your PDF as you type with the auto-compilation feature. You also have the option to disable auto-compilation and switch to a one-click compile and preview mode.`,
  },
  {
    question: "Is LaTeXWriter compatible with BibTeX and reference management?",
    answer: `Yes, LaTeXWriter is fully compatible with BibTeX and reference management. You can easily add or edit BibTeX files within the LaTeX editor, and reference management is fully supported as well.`,
  },
  {
    question: "Is LaTeXWriter free to use?",
    answer: `LaTeXWriter is not free software, but we provide a one-month free trial for all users without requiring credit card details. After the trial, you can choose to continue using LaTeXWriter with a subscription plan.`,
  },
  {
    question: "How can I report issues or request new features in LaTeXWriter?",
    answer: `You can reach out to us at support@latexwriter.com. Please add a clear title such as "Report Issue" or "Request New Feature" in your email. We guarantee a response within 24 hours.`,
  }
]
;

export default function FAQSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
Frequently Asked Questions About LaTeXWriter          </h2>
          
        </div>

        {/* FAQs */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-6">
              <h3 className="font-medium text-gray-900  mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
