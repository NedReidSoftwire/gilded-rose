import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Mock marquee component to avoid animation issues in jsdom
vi.mock('react-fast-marquee', () => {
  return {
    default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  }
})
