import PhoneMockup from "@/components/phoneMockup";
import TemplateInitializer from "@/components/template/templateInitializer";

const Page = () => {
  return (
    <div className="w-full md:h-[90vh] h-[calc(85vh-1rem)]">
      <PhoneMockup>
        <TemplateInitializer />
      </PhoneMockup>
    </div>
  );
};

export default Page;