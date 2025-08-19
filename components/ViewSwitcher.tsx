"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

export function ViewSwitcher() {
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const handleSwitchToV2 = () => {
    router.push('/dashboard/v2/editor')
  }

  // Only show on desktop
  if (!isDesktop) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleSwitchToV2}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        <Monitor className="w-4 h-4 mr-2" />
        Switch to V2 Editor
      </Button>
    </div>
  )
}