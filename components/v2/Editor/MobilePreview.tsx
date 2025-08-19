import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MobilePreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="mx-auto w-64 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 text-white text-xs">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-4 h-2 bg-white rounded-sm opacity-60 ml-2"></div>
              <div className="w-6 h-3 border border-white rounded-sm opacity-60"></div>
            </div>
          </div>

          {/* Header */}
          <div className="px-4 py-2 flex items-center justify-between text-white">
            <div className="text-sm font-medium">🔗 Lynku.id</div>
            <div className="w-6 h-4 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-white rounded"></div>
              <div className="w-full h-0.5 bg-white rounded"></div>
              <div className="w-full h-0.5 bg-white rounded"></div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white mx-3 rounded-t-3xl h-full p-4 space-y-4">
            <div className="text-center space-y-3">
              <Avatar className="w-16 h-16 mx-auto">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Mark" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-lg">Mark Stephanus</h2>
                <p className="text-xs text-gray-600 px-2 leading-relaxed">
                  Hi 👋 call me mark. I'm a digital creator that create some content about digital marketing, business
                  motivation, and technopreneurship
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">@</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">Be</span>
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">D</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <div className="bg-gray-900 text-white p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔗</span>
                  <span className="text-sm">Visit my website</span>
                </div>
                <span className="text-xs">↗</span>
              </div>

              <div className="bg-gray-100 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📦</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-800">Harmonica</div>
                    <div className="text-xs text-gray-500">Limited Series</div>
                  </div>
                  <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">IDR 690K</div>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📷</span>
                  </div>
                  <span className="text-sm">Visit my Instagram</span>
                </div>
                <span className="text-xs">↗</span>
              </div>

              <div className="bg-gray-100 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📚</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-800">Digital Marketing</div>
                    <div className="text-xs text-gray-500">E-Book</div>
                  </div>
                  <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">IDR 690K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
