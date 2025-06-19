import { BASE_URL } from '../lib/api';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Task Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Organize your work, track progress, and collaborate with your team efficiently. 
              Transform chaos into clarity with our intuitive task management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Start Managing Your Tasks
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Task Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Organize Your Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of your tasks with our intuitive Kanban-style dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* To Do Column */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-gray-900">To Do</h3>
                <span className="ml-auto bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Design Homepage</h4>
                  <p className="text-sm text-gray-600 mb-3">Create wireframes and mockups for the new landing page</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-medium">High Priority</span>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Setup Database</h4>
                  <p className="text-sm text-gray-600 mb-3">Configure MongoDB connection and schemas</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">Medium Priority</span>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* In Progress Column */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-gray-900">In Progress</h3>
                <span className="ml-auto bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border-l-4 border-yellow-500 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-semibold text-gray-900 mb-2">User Authentication</h4>
                  <p className="text-sm text-gray-600 mb-3">Implementing JWT tokens and secure login</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">In Development</span>
                    <div className="w-full max-w-20 bg-gray-200 rounded-full h-2 ml-3">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border-l-4 border-yellow-500 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-semibold text-gray-900 mb-2">API Routes</h4>
                  <p className="text-sm text-gray-600 mb-3">Building REST endpoints for data management</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-medium">Backend</span>
                    <div className="w-full max-w-20 bg-gray-200 rounded-full h-2 ml-3">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Column */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-900">Completed</h3>
                <span className="ml-auto bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500 opacity-90 hover:opacity-100 hover:shadow-md transition-all duration-200">
                  <h4 className="font-medium text-gray-900 line-through mb-2">Project Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">Initialize React and Express applications</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">✓ Done</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500 opacity-90 hover:opacity-100 hover:shadow-md transition-all duration-200">
                  <h4 className="font-medium text-gray-900 line-through mb-2">UI Components</h4>
                  <p className="text-sm text-gray-600 mb-3">Setup Tailwind CSS and component library</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">✓ Done</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to boost your productivity and streamline your workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Organization</h3>
              <p className="text-gray-600 leading-relaxed">Organize tasks into categories and track progress effortlessly with our intuitive drag-and-drop interface.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">Work together with your team members in real-time with comments, mentions, and shared workspaces.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Monitor your progress with detailed analytics, reports, and visual dashboards that keep you motivated.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams who have streamlined their workflow with our platform.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get Started Free Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

