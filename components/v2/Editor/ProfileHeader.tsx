import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2, ArrowRight } from "lucide-react"

export function ProfileHeader() {
    return (
        <div className="text-black backdrop-blur-sm  rounded-2xl -m-5 mb-4">
            <div className="flex flex-col ">
                {/* Background */}
                <div className="h-50 bg-red-400 w-full"></div>
                <div className="flex  items-center justify-between bg-white text-black -mt-[6.5rem] rounded-2xl p-6 mx-6 shadow-lg">


                    {/* Left Side - Profile Info */}
                    <div className="flex items-center gap-4">
                        <Avatar className="w-40 h-40 -mt-14 border-2 border-black/20">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Mark Stephanus" />
                            <AvatarFallback>MS</AvatarFallback>
                        </Avatar>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full flex items-center gap-1">🇮🇩 Indonesia</span>
                            </div>
                            <h1 className="text-2xl font-bold">Mark Stephanus</h1>
                            <p className="text-black text-sm">Content Creator | marksteph@gmail.com</p>
                        </div>
                    </div>

                    {/* Right Side - Link Info and Actions */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-sm text-black/60 mb-1">myLinks Link</p>
                            <div className="flex items-center gap-2 bg-black/10 rounded-lg px-4 py-2">
                                <span className="text-purple-300">🔗</span>
                                <span className="text-sm font-medium">https://lynk.id/markstephanus</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-white/10 text-xs">
                                Customize Url <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Url
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
