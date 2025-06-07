
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-gray-900/50 border border-red-800/50 rounded-2xl p-6 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
          <p className="text-gray-400 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button 
            onClick={this.handleReset}
            variant="outline"
            className="border-red-600 text-red-300 hover:bg-red-600/20"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
