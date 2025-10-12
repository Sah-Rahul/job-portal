import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  // Social Media Links
  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  // Quick Links
  const quickLinks = [
    { to: "/jobs", label: "Browse Jobs" },
    { to: "/companies", label: "Companies" },
    { to: "/candidates", label: "Candidates" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About Us" },
  ];

  // Candidate Links
  const candidateLinks = [
    { to: "/browse-jobs", label: "Browse Jobs" },
    { to: "/browse-employers", label: "Browse Employers" },
    { to: "/candidate-dashboard", label: "Candidate Dashboard" },
    { to: "/saved-jobs", label: "Saved Jobs" },
  ];

  // Contact Info
  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "Kathmandu, New Road" },
    { icon: FaPhoneAlt, text: "+1 (555) 123-4567" },
    { icon: FaEnvelope, text: "contact@careerhub.com" },
  ];

  // Footer Bottom Links
  const footerBottomLinks = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/cookies", label: "Cookie Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBriefcase className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-white">
                Career<span className="text-purple-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner in finding the perfect career opportunity.
              Connect with top employers and take your career to the next level.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="text-gray-400 hover:text-purple-500 transition"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-purple-500 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              For Candidates
            </h3>
            <ul className="space-y-2">
              {candidateLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-purple-500 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{contact.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CareerHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerBottomLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-purple-500 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
