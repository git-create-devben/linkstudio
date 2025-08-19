import PhoneMockup from "@/components/phoneMockup";
import TemplateInitializer from "@/components/template/templateInitializer";
import { ViewSwitcher } from "@/components/ViewSwitcher";

const Page = () => {
  return (
    <div className="w-full md:h-[90vh] h-[calc(85vh-1rem)] relative">
      <ViewSwitcher />
      <PhoneMockup>
        <TemplateInitializer />
      </PhoneMockup>
    </div>
  );
};

export default Page;