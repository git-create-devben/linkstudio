import EditorWrapper from "@/components/dashboard/Editor/EditorWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LinkStudio | Link In bio Editor",
    description:
        "Design a single, stunning destination that brings together all your passions, projects, and platforms. Effortlessly. Elegantly.",
}

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <EditorWrapper>
            {children}
        </EditorWrapper>
    )
}
