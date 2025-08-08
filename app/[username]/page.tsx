// app/preview/[username]/page.tsx
import TemplateRenderer from "@/components/template/templateRender";
import { getUserByUsername } from "@/actions/userActions";
import PreviewClient from "./previewClient"; // <- we’ll create this below

const PreviewPage = async ({ params }: { params: { username: string } }) => {
  const profile = await getUserByUsername(params.username);
  if (!profile.profile?.id) throw new Error("No profile found for username");

  return <PreviewClient profile={profile.profile.id} />;
};

export default PreviewPage;
