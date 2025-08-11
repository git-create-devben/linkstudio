// app/preview/[username]/page.tsx
import TemplateRenderer from "@/components/template/templateRender";
import { getUserByUsername } from "@/actions/userActions";
import PreviewClient from "./previewClient"; // <- we’ll create this below
import { redirect } from "next/navigation";

const PreviewPage = async ({ params }: { params: { username: string } }) => {
  const profile = await getUserByUsername(params.username);
  console.log("🚀 ~ PreviewPage ~ profile:", profile)
  if (!profile.profile?.id){
    redirect("/")
  } ;

  return <PreviewClient profile={profile.profile.displayName || ""} />;
};

export default PreviewPage;
