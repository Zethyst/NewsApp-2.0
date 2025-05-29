import React, { Component } from 'react'
import {  AlertCircle } from 'lucide-react';
export default class ErrorMessage extends Component {
  render() {
    const { message, onRetry } = this.props;
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 text-center mb-4 max-w-md">{message}</p>
        <button 
          onClick={onRetry}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
}