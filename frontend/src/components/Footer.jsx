import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800">JobHunt</h2>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            Your trusted platform to discover top job opportunities and connect
            with leading companies across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/jobs" className="hover:text-purple-700">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-purple-700">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/blog" className="hover:text-purple-700">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-purple-700">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-purple-700">
                Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-purple-700">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Follow Us
          </h3>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
