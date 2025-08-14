export const FAQ = () => {
  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major banks, cards, and mobile money through Paystack. Payment methods vary by country and include debit/credit cards, bank transfers, and mobile wallets."
    },
    {
      question: "Why do I see different prices?",
      answer: "We offer localized pricing in multiple currencies to make our service accessible worldwide. Prices are automatically converted to your local currency based on your location."
    }
  ];

  return (
    <div className="mt-12 sm:mt-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-gray-50 rounded-lg p-4 text-left">
            <summary className="font-medium text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
};