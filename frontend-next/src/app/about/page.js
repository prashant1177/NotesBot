import React from 'react';
import { Users, Award, Target, Heart, Mail, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About LaTeXWriter - Learn About Our LaTeX Editing Platform',
  description: 'Discover LaTeXWriter, the modern LaTeX editor for researchers, students, and professionals. Learn about our mission, features, and how we simplify LaTeX document creation.',
  alternates: {
    canonical: "https://latexwriter.com/about",
  },
};


const About = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-4 md:py-16 space-y-16">
        
        {/* About Us Header */}
       <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About 
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Our Story */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
LaTeX Writer was founded in 2025 with the vision of making LaTeX editing simpler and more accessible for everyone. The idea was born when I was working on my final presentation in LaTeX and realized the process felt unnecessarily complex and time-consuming. Determined to find a better way, I immersed myself in learning LaTeX and exploring how its editing experience could be improved. What started as a personal challenge quickly grew into a mission — to build a platform that makes LaTeX editing faster, smoother, and user-friendly for students, researchers, and professionals alike.          </p>
        </section>

        {/* Our Mission */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
At Latexwriter, our mission is to make professional document creation accessible to everyone by offering intuitive, powerful LaTeX tools. We want researchers, students, and professionals to spend less time wrestling with formatting and more time focusing on their ideas. By blending technical precision with creative flexibility, Latexwriter bridges the gap between complexity and simplicity in academic and scientific writing.          </p>
        </section>

        {/* Our Vision & Values */}
        <section className="bg-gray-50 rounded-xl border p-8">
          <div className="flex items-center mb-8">
            <Heart className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Vision & Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-700">
                We continuously push boundaries in document processing technology, integrating AI-powered features and real-time collaboration tools to stay ahead of evolving user needs.
              </p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-700">
                Making professional LaTeX editing accessible to users of all skill levels through intuitive interfaces, comprehensive templates, and educational resources.
              </p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-700">
                Providing robust, secure, and dependable tools that researchers can trust with their most important work, backed by enterprise-grade infrastructure.
              </p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-700">
                Building a supportive ecosystem where users can collaborate, share knowledge, and contribute to advancing scientific communication worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Meet the Founder</h2>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                 PJ
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prashant Jitendra Patil</h3>
              <p className="text-blue-600 font-medium mb-3">Founder of LaTeXWriter</p>
              <p className="text-gray-600 text-sm">
A Computer Science student with a strong passion for technology, problem-solving, and innovation.              </p>
            </div>
          </div>
        </section>

        {/* Achievements & Milestones */}
       

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Why Choose LatexWrite?</h2>
          <p className="text-lg leading-relaxed mb-6">
 Latexwriter was created to make LaTeX editing accessible, fast, and user-friendly. 
    Unlike traditional LaTeX editors that feel complex and overwhelming, Latexwriter 
    blends the precision of LaTeX with a modern, intuitive experience. Our smart editor, 
    AI-powered suggestions, and seamless academic integrations help you focus on your 
    research and writing—while we handle the formatting. Whether you’re drafting 
    a thesis, journal paper, or professional presentation, Latexwriter ensures speed, 
    simplicity, and accuracy.          </p>
          
        </section>

        {/* Call to Action */}
       
      </div>

      
    </div>
  );
};

export default About;