"use client"
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { useState } from "react";

interface ContactFormActionProps {
  action: ActionItemType;
  theme: Theme;
}

const ContactFormAction = ({ action, theme }: ContactFormActionProps) => {
  const { design } = useUserContentStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const buttonStyle = getButtonStyle(design, theme);

  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2 
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{ 
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {action.config.title}
        </h2>
      )}
      
      <div 
        className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 8px 32px ${theme.colors.shadow}`
        }}
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            >
              Message Sent!
            </h3>
            <p 
              className="text-sm opacity-80"
              style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
            >
              Thank you for reaching out. I'll get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: `1px solid ${theme.colors.border}`,
                  color: theme.colors.textPrimary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full p-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: `1px solid ${theme.colors.border}`,
                  color: theme.colors.textPrimary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              />
            </div>
            
            <div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full p-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: `1px solid ${theme.colors.border}`,
                  color: theme.colors.textPrimary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 font-semibold transition-all duration-300 ${buttonStyle.className} ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
              style={{
                ...buttonStyle.style,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactFormAction;