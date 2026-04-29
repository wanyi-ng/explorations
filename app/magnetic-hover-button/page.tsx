'use client'
import React, { useRef } from 'react'
import gsap from 'gsap'
import "./style.css"

export default function MagneticHoverButton() {  
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submitButtonFiller = useRef<HTMLSpanElement>(null)

  const getXY = (e) => {
    if (!submitButtonRef.current) return
    
    const { left, top, width, height } = submitButtonRef.current.getBoundingClientRect()
    
    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    )
    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    )

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top)
    }
  }
  
  const handleMouseButtonEnter = (e) =>  {
    const { x, y } = getXY(e)

    const setX = (x) => {
      gsap.quickSetter(submitButtonFiller.current, "xPercent")
    }
    const setY = (x) => {
      gsap.quickSetter(submitButtonFiller.current, "yPercent")
    }
    setX(x)
    setY(y)

    gsap.to(submitButtonFiller.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })

    return () => gsap.killTweensOf(submitButtonFiller.current)
  }
  
  const handleMouseButtonLeave = (e) => {
    const { x, y } = getXY(e)

    gsap.to(submitButtonFiller.current, {
      xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
      yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
      scale: 0,
      duration: 0.3,
      ease: "power2.out",
    })

    return () => gsap.killTweensOf(submitButtonFiller.current)
  }

  const handleMouseButtonMove = (e) => {
    const { x, y } = getXY(e)

    gsap.to(submitButtonFiller.current, {
      xPercent: x,
      yPercent: y,
      duration: 0.4,
      ease: "power2"
    })
    
    return () => gsap.killTweensOf(submitButtonFiller.current)
  }

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen space-y-6">
      <button
        ref={submitButtonRef}
        type="submit"
        className="button__submit"
        onMouseEnter={handleMouseButtonEnter}
        onMouseLeave={handleMouseButtonLeave}
        onMouseMove={handleMouseButtonMove}
      >
        <span className="button__label">
          Submit
        </span>
        <span
          className="button__filler"
          ref={submitButtonFiller}
        />
      </button>
      <p>Translate <a href="https://codepen.io/GreenSock/pen/MWRPXMr" className="underline">GSAP magnet button</a> from class component to functional component</p>
    </main>
  )
}
