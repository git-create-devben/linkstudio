import PreviewClient from "@/app/[username]/previewClient";

const PreviewPage = async (props: { params: Promise<{ username: string }> }) => {
  const params = await props.params;

  return <PreviewClient username={params.username} />;
};

export default PreviewPage;