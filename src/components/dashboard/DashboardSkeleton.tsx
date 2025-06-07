
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Skeleton className="h-8 w-32 bg-gray-800" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-24 bg-gray-800" />
              <Skeleton className="h-8 w-16 bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Welcome Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-96 mb-4 bg-gray-800" />
            <Skeleton className="h-6 w-64 bg-gray-700" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-3 space-y-8">
              {/* Overview Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
                  <Skeleton className="h-16 w-full mb-4 bg-gray-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
                  <Skeleton className="h-16 w-full mb-4 bg-gray-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-2/3 bg-gray-800" />
                  </div>
                </div>
              </div>

              {/* Large Section Skeletons */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <Skeleton className="h-8 w-48 mb-6 bg-gray-800" />
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="bg-gray-800/50 rounded-lg p-4">
                        <Skeleton className="h-32 w-full mb-4 bg-gray-700" />
                        <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                        <Skeleton className="h-4 w-3/4 bg-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-1 bg-gray-700" />
                          <Skeleton className="h-3 w-2/3 bg-gray-800" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;
