// app/preview/[username]/page.tsx
import TemplateRenderer from "@/components/template/templateRender";
import { getUserByUsername } from "@/actions/userActions";
import PreviewClient from "./previewClient"; // <- we’ll create this below

const PreviewPage = async ({ params }: { params: { username: string } }) => {
  const profile = await getUserByUsername(params.username);
  console.log("🚀 ~ PreviewPage ~ profile:", profile)
  if (!profile.profile?.id) throw new Error("No profile found for username");

  return <PreviewClient profile={profile.profile.displayName || ""} />;
};

export default PreviewPage;
