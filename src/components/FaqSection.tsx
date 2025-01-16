import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is a Token Faucet?",
    answer: "A token faucet is a development tool that dispenses test tokens for use on test networks. It helps developers test their applications without using real tokens."
  },
  {
    question: "How often can I request tokens?",
    answer: "You can request tokens once per hour per wallet address to prevent abuse of the system."
  },
  {
    question: "What networks are supported?",
    answer: "Currently, we support test networks including Goerli, Sepolia, and Mumbai. Make sure your wallet is connected to the correct network."
  },
  {
    question: "How many tokens can I request?",
    answer: "You can request 10, 20, or 50 tokens per transaction, subject to faucet availability and rate limits."
  }
];

export const FaqSection = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};