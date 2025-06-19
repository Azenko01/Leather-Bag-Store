"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="h-[600px] flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg">
            <div className="text-center">
              <div className="w-24 h-16 bg-amber-800 rounded-lg mx-auto mb-4 shadow-lg"></div>
              <p className="text-amber-800 font-medium">Premium Leather Briefcase</p>
              <p className="text-amber-600 text-sm">Loading Preview...</p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
