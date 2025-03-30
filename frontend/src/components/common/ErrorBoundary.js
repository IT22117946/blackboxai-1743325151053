import { Component } from 'react';
import { Button } from '../ui/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but an unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <p className="text-sm font-mono text-red-500">
                {this.state.error?.toString()}
              </p>
            </div>
            <Button
              onClick={this.handleReset}
              variant="primary"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;