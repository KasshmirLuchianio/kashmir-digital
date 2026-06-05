import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let cx = 0, cy = 0
    let tx = 0, ty = 0

    const onMouse = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
      cursor.style.transform = `translate(${cx - 12}px, ${cy - 12}px)`
    }

    const onHover = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('clickable')) {
        cursor.style.width = '48px'
        cursor.style.height = '48px'
        cursor.style.borderColor = 'rgba(74, 144, 255, 0.5)'
        cursor.style.background = 'rgba(74, 144, 255, 0.08)'
      }
    }

    const onUnhover = () => {
      cursor.style.width = '24px'
      cursor.style.height = '24px'
      cursor.style.borderColor = 'rgba(255,255,255,0.3)'
      cursor.style.background = 'transparent'
    }

    const animate = () => {
      tx += (cx - tx) * 0.12
      ty += (cy - ty) * 0.12
      trail.style.transform = `translate(${tx - 40}px, ${ty - 40}px)`
      requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener('mousemove', onMouse)
    document.addEventListener('mouseover', onHover)
    document.addEventListener('mouseout', onUnhover)

    // Hide cursor on touch devices
    const isTouch = 'ontouchstart' in window
    if (isTouch) {
      cursor.style.display = 'none'
      trail.style.display = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseover', onHover)
      document.removeEventListener('mouseout', onUnhover)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }}
      />
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,144,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(0, 0)',
          willChange: 'transform',
        }}
      />
    </>
  )
}