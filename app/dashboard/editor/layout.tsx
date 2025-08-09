import EditorWrapper from "@/components/dashboard/Editor/EditorWrapper";
import { UserProvider } from "@/context/UserProvider";
import { getUser } from "@/actions/authActions";
import { Metadata } from "next";
import type { User } from "@/context/userContext";

export const metadata: Metadata = {
    title: "LinkStudio | Link In bio Editor",
    description:
        "Design a single, stunning destination that brings together all your passions, projects, and platforms. Effortlessly. Elegantly.",
}

export default async function EditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser();
    
    return (
        <UserProvider user={user}>
            <EditorWrapper>
                {children}
            </EditorWrapper>
        </UserProvider>
    )
}
