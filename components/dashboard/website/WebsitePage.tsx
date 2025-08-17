import { Glass } from '@/app/dashboard/website/Glass'
import AnimatedWrapper from '@/components/animated-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const WebsitePage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-2  bg-gradient-to-br from-blue-50 via-white to-purple-100 overflow-x-hidden">
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-white rounded-full blur-3xl z-0" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-200/30 to-purple-300/10 rounded-full blur-2xl z-0" />

            {/* HERO + CONTACT CTA */}
            <AnimatedWrapper elementType="section" className="w-full max-w-4xl mx-auto text-center z-10 rounded-md">
                {/* <LogoApple /> */}
                <Glass className="mt-5 p-4 md:p-14 flex flex-col items-center shadow-sm w-full">
                    <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4" style={{ letterSpacing: '-.01em' }}>
                        Let's Build Your Vision Together
                    </h1>
                    <p className="mt-2 text-sm md:text-xl text-gray-700 font-medium max-w-lg mx-auto">
                        I design and build beautiful, modern, fully custom websites for creators and brands who want to stand out. If you're ready for something truly unique, reach out—I'd love to work with you.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full">
                        <a href="mailto:benlad636@gmail.com" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                                <span className="flex items-center justify-center"><ArrowRight className="mr-2.5 w-5 h-5" /> Contact Me</span>
                            </Button>
                        </a>
                        <a href="https://cal.com/devben.tech" target="_blank" rel="noopener" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-blue-600 text-blue-100 font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-blue-50 hover:text-black transition-all">
                                Book a Call
                            </Button>
                        </a>
                    </div>
                </Glass>
            </AnimatedWrapper>

            {/* VALUE PROPOSITION CARD */}
            <AnimatedWrapper className="w-full max-w-4xl mx-auto mt-16 z-10">
                <Card className="p-4 md:p-12 bg-white/80 border-0 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-12 backdrop-blur-xl">
                    <div className="flex-1 text-center text-left">
                        <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-2">Why work with me?</h2>
                        <ul className="mt-4 space-y-2 text-gray-700 text-sm md:text-lg list-outside list-disc px-2">
                            <li>Bespoke, modern design—never templates</li>
                            <li>Fast, responsive, and SEO-friendly builds</li>
                            <li>Collaborative, friendly process</li>
                            <li>Every detail, pixel-perfect</li>
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="h-36 w-48 md:h-48 rounded-2xl bg-gradient-to-tr from-blue-100 via-white to-purple-100 shadow-inner flex items-center justify-center">
                            <span className="text-5xl md:text-6xl">🚀</span>
                        </div>
                    </div>
                </Card>
            </AnimatedWrapper>

            {/* FINAL CTA */}
            <AnimatedWrapper elementType="section" className="w-full max-w-4xl mx-auto text-center mt-20 z-10">
                <Glass className="px-4 py-6 flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                    <p className="text-lg text-gray-700 mb-8">Drop me a message or book a call. Let's make something beautiful together.</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <a href="mailto:benlad636@gmail.com" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                                <span className="flex items-center justify-center"><ArrowRight className="mr-2.5 w-5 h-5" /> Contact Me</span>
                            </Button>
                        </a>
                        <a href="https://cal.com/devben.tech" target="_blank" rel="noopener" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-blue-600 text-blue-700 font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-blue-50 transition-all">
                                Book a Call
                            </Button>
                        </a>
                    </div>
                </Glass>
            </AnimatedWrapper>

            {/* Footer gradient for depth */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-blue-50/70 to-transparent z-0" />
        </div>
    )
}

export default WebsitePage