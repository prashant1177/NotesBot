import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the document review work?",
      answer: "Once you upload your PDF, our AI analyzes the content, structure, and language. It generates a detailed peer review, including insights on readability, word count, reading time, document statistics, and recommendations for improvement."
    },
    {
      question: "What kind of output will I get?",
      answer: "You will receive a structured report with sections like Word Count, Reading Ease, Grade Level, Detailed Stats, Top Words, and a full AI-generated peer review. The review highlights strengths, weaknesses, and actionable suggestions for improvement."
    },
    {
      question: "Is my document safe?",
      answer: "Yes, your privacy is a top priority. Uploaded documents are automatically deleted from our servers 30 minutes after upload. No files are stored permanently, and no third parties have access to your content."
    },
    {
      question: "Can I upload multiple documents?",
      answer: "You can upload one document at a time for review. Once the current review is complete, you can upload another file."
    },
    {
      question: "What formats are supported?",
      answer: "Currently, only PDF files are supported. Ensure your document is in PDF format and under 10MB for successful upload."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mt-48 mb-12 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Document Review - Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-6 pb-4 text-gray-700 leading-relaxed">
                {faq.answer.includes('30 minutes after upload') ? (
                  <>
                    {faq.answer.split('30 minutes after upload')[0]}
                    <strong>30 minutes after upload</strong>
                    {faq.answer.split('30 minutes after upload')[1]}
                  </>
                ) : (
                  faq.answer
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}