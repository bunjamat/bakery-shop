'use client'
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            เกิดข้อผิดพลาดบางอย่าง
          </h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-orange-500 hover:text-orange-600"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )
    }

    return this.props.children
  }
}