import EditorSidebar from "@/components/dashboard/Editor/EditorSidebar"
import UserContext from "@/context/userContext";
import { getUser } from "@/actions/authActions";
import { Metadata } from "next"
import { useIsMobile } from "@/hooks/use-mobile";
import EditorSidebarMobile from "@/components/dashboard/Editor/EditorSidebarMobile";

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
            <div className="flex justify-center gap-12 ">
                <div className="hidden md:block">
                    <EditorSidebar />
                </div>


                <main className="flex flex-col">
                    <section className="relative">
                        {children}
                    </section>
                    <div className=" block md:hidden">
                        <EditorSidebarMobile />
                    </div>
                </main>

            </div>
        </div>
    )
}