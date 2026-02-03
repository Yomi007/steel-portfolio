import React, { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
                    <div className="max-w-md w-full text-center">
                        <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-6">
                            <AlertTriangle size={48} className="text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-slate-400 mb-8">
                            Don't worry, it's not you — it's us. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-white text-slate-950 rounded-full font-medium hover:bg-slate-200 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
