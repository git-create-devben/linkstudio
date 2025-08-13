import PaymentPlans from "@/components/payment/paymentPlan";

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="bg-gray-900 text-white py-16 sm:py-24 lg:py-32">
      <div className="relative">
        <PaymentPlans />
      </div>
    </section>
  );
}