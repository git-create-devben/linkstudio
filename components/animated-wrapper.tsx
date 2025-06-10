"use client"
import { motion, type Variants } from "framer-motion"
import type React from "react"

interface AnimatedWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  variants?: Variants
  initial?: string | boolean
  animate?: string | boolean
  whileInView?: string | boolean
  viewportOnce?: boolean
  transitionDelay?: number
  staggerChildren?: number
  elementType?: keyof React.JSX.IntrinsicElements
}

// Corrected easing values
const smoothEase = [0.4, 0.0, 0.2, 1] satisfies number[]

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  id,
  variants = defaultVariants,
  initial = "hidden",
  whileInView = "visible", // Changed default to whileInView for scroll-triggered animations
  animate, // Allow direct animate prop
  viewportOnce = true,
  transitionDelay = 0,
  staggerChildren,
  elementType = "div",
}) => {
  const MotionComponent = motion[elementType]

  return (
    <MotionComponent
      id={id}
      className={className}
      variants={variants}
      initial={initial}
      whileInView={animate ? undefined : whileInView} // Only use whileInView if animate is not set
      animate={animate ? animate : undefined} // Use animate if provided
      viewport={{ once: viewportOnce, amount: 0.1 }} // Trigger when 10% is visible
      transition={{ duration: 0.6, delay: transitionDelay, staggerChildren, ease: smoothEase }}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimatedWrapper
