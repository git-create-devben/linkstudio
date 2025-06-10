import EditorHeader from "@/components/dashboard/Editor/EditorSidebar"
import UserContext from "@/context/userContext";
import { getUser } from "@/actions/authActions";
import { Metadata } from "next"

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
        <div>
            <div className="flex justify-center gap-12 p-5 relative">
                <div className="hidd">
                    <EditorHeader />
                </div>

                <main className="top-20">
                    {children}
                </main>
            </div>
        </div>
    )
}