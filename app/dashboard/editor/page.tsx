import PhoneMockup from "@/components/phoneMockup";
import TemplateInitializer from "@/components/template/templateInitializer";

const Page = () => {
  return (
    <div className="w-full h-[90vh]">
      <PhoneMockup>
        <TemplateInitializer />
      </PhoneMockup>
    </div>
  );
};

export default Page;