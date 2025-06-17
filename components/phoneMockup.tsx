
import React, { useState, useEffect, useRef } from "react";

const PhoneMockup = ({ children }: { children: React.ReactNode }) => {
const [dimensions, setDimensions] = useState({
    scale: 1,
    phoneWidth: 375,
    phoneHeight: 812,
    containerWidth: 0,
    containerHeight: 0
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // iPhone 13/14 dimensions as base (modern standard)
      const basePhoneWidth = 375;
      const basePhoneHeight = 812;
      
      // Calculate margins for the mockup frame
      const frameMargin = 40; // Space for phone frame/shadow
      const availableWidth = containerWidth - frameMargin;
      const availableHeight = containerHeight - frameMargin;

      // Calculate scale to fit within container
      const widthScale = availableWidth / basePhoneWidth;
      const heightScale = availableHeight / basePhoneHeight;
      const optimalScale = Math.min(widthScale, heightScale);

      // Ensure scale is reasonable (not too small or too large)
      const finalScale = Math.min(Math.max(optimalScale, 0.4), 1.5);

      setDimensions({
        scale: finalScale,
        phoneWidth: basePhoneWidth,
        phoneHeight: basePhoneHeight,
        containerWidth,
        containerHeight
      });
    };

    calculateDimensions();
    
    const resizeObserver = new ResizeObserver(calculateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const { scale, phoneWidth, phoneHeight } = dimensions;

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100%' }}
    >
      {/* Phone Container */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Phone Shadow/Glow */}
        <div 
          className="absolute inset-0 rounded-[2.5rem] opacity-20 blur-xl"
          style={{
            background: 'linear-gradient(145deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
            transform: 'translateY(8px) scale(1.02)'
          }}
        />
        
        {/* Phone Frame */}
        <div
          className="relative bg-black rounded-[2.5rem] p-1 shadow-2xl"
          style={{
            width: phoneWidth + 16,
            height: phoneHeight + 16
          }}
        >
          {/* Screen */}
          <div
            className="bg-white rounded-[2.25rem] overflow-hidden relative"
            style={{
              width: phoneWidth,
              height: phoneHeight
            }}
          >
            {/* Dynamic Island (iPhone 14 Pro style) */}
            <div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full z-50"
              style={{
                width: '126px',
                height: '37px',
                borderRadius: '19px'
              }}
            />

            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 pt-3 z-40 bg-transparent">
              <div className="text-black text-sm font-semibold">
                9:41
              </div>
              <div className="flex items-center space-x-1">
                {/* Signal bars */}
                <div className="flex space-x-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-1 bg-black rounded-full ${i <= 3 ? 'h-2' : 'h-3'}`} />
                  ))}
                </div>
                {/* WiFi */}
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.24 0 1 1 0 01-1.415-1.414 5 5 0 017.07 0 1 1 0 01-1.415 1.414zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-6 h-3 border border-black rounded-sm relative">
                    <div className="w-4 h-1.5 bg-black rounded-sm absolute top-0.5 left-0.5" />
                  </div>
                  <div className="w-0.5 h-1.5 bg-black rounded-r-sm ml-0.5" />
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full opacity-60 z-40"
              style={{
                width: '134px',
                height: '5px'
              }}
            />

            {/* Content Area with Perfect Mobile Scrolling */}
            <div 
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{
                paddingTop: '48px', // Space for status bar + dynamic island
                paddingBottom: '16px', // Space for home indicator
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Mobile-Optimized Content Wrapper */}
              <div 
                className="w-full min-h-full"
                style={{
                  fontSize: '16px', // Base mobile font size
                  lineHeight: '1.5',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;