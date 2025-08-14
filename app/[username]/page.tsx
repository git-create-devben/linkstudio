// app/preview/[username]/page.tsx
import TemplateRenderer from "@/components/template/templateRender";
import { getUserByUsername } from "@/actions/userActions";
import PreviewClient from "./previewClient"; // <- we’ll create this below
import { redirect } from "next/navigation";

const PreviewPage = async (props: { params: Promise<{ username: string }> }) => {
  const params = await props.params;
  const profile = await getUserByUsername(params.username);
  if (!profile.profile?.id){
    redirect("/")
  }

  return <PreviewClient username={params.username} />;
};

export default PreviewPage;
