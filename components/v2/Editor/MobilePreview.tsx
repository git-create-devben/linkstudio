"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import PhoneMockup from "@/components/phoneMockup"
import TemplateInitializer from "@/components/template/templateInitializer"

export function MobilePreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="w-full h-[600px]">
        <PhoneMockup>
          <TemplateInitializer />
        </PhoneMockup>
      </div>
    </div>
  )
}
