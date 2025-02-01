import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-b border-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* First Column: Copyright Section */}
          <div className="space-y-2 flex flex-col items-center justify-center h-full">
            <p className="text-gray-300 text-xs text-center">
              &copy; {new Date().getFullYear()} College Sports Week. All rights reserved.
            </p>
            <p className="text-gray-300 text-xs text-center">
              Organized by the <span className="font-semibold">Student Council</span>
            </p>
          </div>
          {/* Second Column: Contact Us */}
          <div className="space-y-2 flex flex-col items-center">
            {/* <h3 className="text-md font-semibold">Contact Us</h3> */}
            <ul className="space-y-1 text-center">
              <li className="flex items-center space-x-1">
                <MdEmail className="text-gray-300" size={16} />
                <a
                  href="mailto:rbtstar21@gmail.com"
                  className="text-gray-300 text-xs hover:text-white transition-colors"
                >
                  rbtstar21@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <MdPhone className="text-gray-300" size={16} />
                <a
                  href="tel:+91 863 812 2827"
                  className="text-gray-300 text-xs hover:text-white transition-colors"
                >
                  +91 863 812 2827
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <MdLocationOn className="text-gray-300" size={16} />
                <span className="text-gray-300 text-xs">University Campus, Silapathar</span>
              </li>
            </ul>
          </div>
          {/* Third Column: Social Icons (without "Follow Us" heading) */}
          <div className="flex justify-center items-center">
            {[
              { Icon: FaFacebook, link: "https://facebook.com", label: "Facebook" },
              { Icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
              { Icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
              { Icon: FaLinkedin, link: "https://linkedin.com", label: "LinkedIn" }
            ].map(({ Icon, link, label }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors mx-2"
              >
                <Icon size={20} />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
