import React from 'react';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Crash Error:", error, errorInfo);
  }

  handleRefresh = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg my-4">
          <Alert variant="danger" className="text-red-700">
            <h4 className="font-bold mb-2">Component Crashed!</h4>
            <p className="mb-3">{this.state.error?.toString()}</p>
            <button
              onClick={this.handleRefresh}
              className="bg-[#E74C3C] text-white px-4 py-2 rounded hover:bg-[#ff6b5b] transition-colors"
            >
              Reload Component
            </button>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;