'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type PopupShellProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
  closeOnEscape?: boolean
}

const PopupShell = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnEscape = true,
}: PopupShellProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.classList.add('popup-page-locked')
    document.body.classList.add('popup-page-locked')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.documentElement.classList.remove('popup-page-locked')
      document.body.classList.remove('popup-page-locked')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeOnEscape, isOpen, onClose])

  const portalTarget = typeof document === 'undefined' ? null : document.body

  if (!portalTarget || !isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] bg-[color:rgba(0,0,0,0.72)] backdrop-blur-[10px]"
      aria-hidden={false}
    >
      <div className="popup-scrollbar-hidden relative h-dvh overflow-hidden">
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-[2147483647] h-[44px] border-b border-white/10 bg-black/70 backdrop-blur-xl"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="fixed right-3 top-3 z-[2147483647] inline-flex size-8 items-center justify-center rounded-full border border-[#b8ea18]/25 bg-[#1f2b06] text-white transition-colors hover:bg-[#2b3b08] sm:right-4"
        >
          <X size={18} strokeWidth={2.1} />
        </button>

        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`popup-scrollbar-hidden fixed inset-x-0 bottom-0 top-[44px] z-[2147483646] w-screen max-w-none overflow-y-scroll overflow-x-hidden bg-black px-3 pb-4 pt-0 animate-[popup-drop_220ms_ease-out] sm:px-4 md:px-5 lg:px-6 xl:px-8 ${className}`}
        >
          {children}
        </div>
      </div>
    </div>,
    portalTarget
  )
}

export default PopupShell
