import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Camera,
  Share2,
  AtSign,
  PlayCircle,
  ShieldCheck
} from 'lucide-react';
import logo from '../../../assets/images/Logo.png';

const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <footer className={`${theme.bgSecondary}
      border-t ${theme.border} mt-auto font-poppins`}>
      <div className="max-w-6xl mx-auto px-6 md:px-16
        py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <img src={logo} alt="logo" className="h-8 mb-4" />
          <p className={`text-sm leading-relaxed
            ${theme.textSecondary} mb-4`}>
            Your trusted destination for quality products
            at the best prices. Shop with confidence.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Camera, label: 'Instagram' },
              { icon: Share2, label: 'Facebook' },
              { icon: AtSign, label: 'Twitter' },
              { icon: PlayCircle, label: 'Youtube' },
            ].map(({ icon: Icon, label }) => (
              <button key={label}
                className={`w-8 h-8 rounded-full
                  ${theme.bgCard} border ${theme.border}
                  flex items-center justify-center
                  hover:bg-blue-500 hover:border-blue-500
                  hover:text-white transition-all group`}
                aria-label={label}>
                <Icon size={16} className={`${theme.textSecondary}
                  group-hover:text-white`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`font-bold mb-3 ${theme.text}`}>
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { label: 'Home', path: '/home' },
              { label: 'Products', path: '/products' },
              { label: 'Categories', path: '/categories' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <li key={link.label}>
                <button
                  onClick={() => navigate(link.path)}
                  className={`text-sm ${theme.textSecondary}
                    hover:text-blue-500 transition-colors
                    flex items-center gap-2`}>
                  <ChevronRight size={14} />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`font-bold mb-3 ${theme.text}`}>
            Categories
          </h3>
          <ul className="space-y-2">
            {[
              'Electronics',
              'Fashion',
              'Sports',
              'Bags',
              'Shoes',
              'Accessories',
            ].map(cat => (
              <li key={cat}>
                <button
                  onClick={() => navigate('/categories')}
                  className={`text-sm ${theme.textSecondary}
                    hover:text-blue-500 transition-colors
                    flex items-center gap-2`}>
                  <ChevronRight size={14} />
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`font-bold mb-3 ${theme.text}`}>
            Contact Us
          </h3>
          <ul className="space-y-3">
            {[
              {
                icon: MapPin,
                text: '123 Shop Street, Cairo, Egypt'
              },
              {
                icon: Phone,
                text: '+20 123 456 7890'
              },
              {
                icon: Mail,
                text: 'support@eshop.com'
              },
              {
                icon: Clock,
                text: 'Mon-Fri: 9AM - 6PM'
              },
            ].map(({ icon: Icon, text }) => (
              <li key={text}
                className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg
                  bg-blue-500/10 flex items-center
                  justify-center shrink-0 mt-0.5">
                  <Icon size={15} className="text-blue-500" />
                </div>
                <span className={`text-sm ${theme.textSecondary}
                  leading-relaxed`}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`border-t ${theme.border}
        px-6 md:px-16 py-3`}>
        <div className="max-w-6xl mx-auto flex flex-col
          md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs ${theme.textSecondary}`}>
              We Accept:
            </span>
            {[
              { label: 'VISA', bg: 'bg-blue-600' },
              { label: 'MC', bg: 'bg-red-500' },
              { label: 'PayPal', bg: 'bg-blue-400' },
              { label: 'COD', bg: 'bg-green-500' },
            ].map(({ label, bg }) => (
              <span key={label}
                className={`${bg} text-white text-[10px]
                  font-bold px-2.5 py-1 rounded-md`}>
                {label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            <span className={`text-xs ${theme.textSecondary}`}>
              Secure & Encrypted Payments
            </span>
          </div>
        </div>
      </div>

      <div className={`border-t ${theme.border}
        px-6 md:px-16 py-3`}>
        <div className="max-w-6xl mx-auto flex flex-col
          md:flex-row items-center justify-between gap-2">
          <p className={`text-xs ${theme.textSecondary}`}>
            © 2025 EShop. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service',
              'Cookie Policy'].map(item => (
              <button key={item}
                className={`text-xs ${theme.textSecondary}
                  hover:text-blue-500 transition-colors`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
