import ModernMusicTemplate from "@/components/template/templates/modernMusic";
import { templates } from "@/components/template/templateData";

export default function TestTemplatePage() {
  const modernMusicTemplateData = templates.find(t => t.id === "modernMusic");
  
  if (!modernMusicTemplateData) {
    return <div>Modern Music template not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Template Test</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {modernMusicTemplateData.preview}
        </div>
      </div>
    </div>
  );
}