import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Indigo Airlines</h1>
            <p className="text-gray-400">© {new Date().getFullYear()} Indigo Airlines. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
