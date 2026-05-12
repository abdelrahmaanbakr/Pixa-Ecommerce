import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
  Send,
  Loader2,
  Camera,
  Share2,
  AtSign,
  PlayCircle
} from 'lucide-react';

const contactCards = [
  {
    icon: MapPin,
    title: 'Our Location',
    value: '123 Shop Street',
    sub: 'Cairo, Egypt',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    value: '+20 123 456 7890',
    sub: 'Mon-Fri, 9AM-6PM',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Mail,
    title: 'Email Address',
    value: 'support@eshop.com',
    sub: 'Reply within 24hrs',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon - Fri',
    sub: '9:00 AM - 6:00 PM',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
];

const socialLinks = [
  {
    icon: Camera,
    label: 'Instagram',
    handle: '@eshop',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  {
    icon: Share2,
    label: 'Facebook',
    handle: 'EShop Official',
    color: 'text-blue-600',
    bg: 'bg-blue-600/10'
  },
  {
    icon: AtSign,
    label: 'Twitter',
    handle: '@eshop',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10'
  },
  {
    icon: PlayCircle,
    label: 'YouTube',
    handle: 'EShop TV',
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  },
];

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email ||
        !formData.subject || !formData.message) {
      toast.error('Please fill all required fields!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email!');
      return;
    }

    setIsLoading(true);

    // TODO: POST /api/contact { ...formData }
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success("Message sent! We'll reply soon 🎉");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${theme.bg} font-poppins`}>
      <section className="bg-gradient-to-r from-blue-600
        to-blue-400 py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold
            text-white mb-3">
            Contact Us
          </h1>
          <p className="text-blue-100 text-lg">
            We'd love to hear from you 💬
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-16
        py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4
          mb-12">
          {contactCards.map(({ icon: Icon, title, value, sub, color, bg }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`${theme.card} rounded-2xl p-5
                text-center shadow-sm`}>
              <div className={`w-12 h-12 ${bg} rounded-xl
                flex items-center justify-center mx-auto mb-3`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className={`font-bold text-sm mb-1 ${theme.text}`}>
                {title}
              </h3>
              <p className={`text-sm font-medium ${theme.text}`}>
                {value}
              </p>
              <p className={`text-xs ${theme.textSecondary} mt-0.5`}>
                {sub}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${theme.card} rounded-2xl p-6 shadow-sm`}>
            <h2 className={`text-xl font-bold mb-6 ${theme.text}`}>
              Send us a Message
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium
                    mb-1.5 block ${theme.text}`}>
                    Full Name *
                  </label>
                  <div className={`flex items-center gap-3
                    px-4 py-3 rounded-xl border
                    ${theme.input} ${theme.border}
                    focus-within:border-blue-500 transition-colors`}>
                    <User size={16} className={theme.textSecondary} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({
                        ...formData, name: e.target.value
                      })}
                      className={`bg-transparent outline-none
                        text-sm w-full ${theme.text}
                        placeholder-gray-400`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-sm font-medium
                    mb-1.5 block ${theme.text}`}>
                    Email *
                  </label>
                  <div className={`flex items-center gap-3
                    px-4 py-3 rounded-xl border
                    ${theme.input} ${theme.border}
                    focus-within:border-blue-500 transition-colors`}>
                    <Mail size={16} className={theme.textSecondary} />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({
                        ...formData, email: e.target.value
                      })}
                      className={`bg-transparent outline-none
                        text-sm w-full ${theme.text}
                        placeholder-gray-400`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium
                  mb-1.5 block ${theme.text}`}>
                  Subject *
                </label>
                <div className={`flex items-center gap-3
                  px-4 py-3 rounded-xl border
                  ${theme.input} ${theme.border}
                  focus-within:border-blue-500 transition-colors`}>
                  <MessageSquare size={16}
                    className={theme.textSecondary} />
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({
                      ...formData, subject: e.target.value
                    })}
                    className={`bg-transparent outline-none
                      text-sm w-full ${theme.text}
                      placeholder-gray-400`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium
                  mb-1.5 block ${theme.text}`}>
                  Message *
                </label>
                <div className={`px-4 py-3 rounded-xl border
                  ${theme.input} ${theme.border}
                  focus-within:border-blue-500 transition-colors`}>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({
                      ...formData, message: e.target.value
                    })}
                    className={`bg-transparent outline-none
                      text-sm w-full resize-none ${theme.text}
                      placeholder-gray-400`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600
                  text-white py-3.5 rounded-xl font-semibold
                  transition-colors flex items-center
                  justify-center gap-2 disabled:opacity-70">
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6">
            <div className={`${theme.card} rounded-2xl
              overflow-hidden shadow-sm flex-1 min-h-[300px]
              flex flex-col items-center justify-center gap-3
              border-2 border-dashed ${theme.border}`}>
              <MapPin size={48} className="text-blue-500 opacity-50" />
              <p className={`font-semibold ${theme.text}`}>
                Find Us Here
              </p>
              <p className={`text-sm ${theme.textSecondary}
                text-center px-4`}>
                123 Shop Street, Cairo, Egypt
              </p>
              <button
                onClick={() => window.open(
                  'https://maps.google.com', '_blank'
                )}
                className="mt-2 bg-blue-500 text-white
                  px-6 py-2 rounded-full text-sm font-medium
                  hover:bg-blue-600 transition-colors
                  flex items-center gap-2">
                <MapPin size={16} />
                Open in Maps
              </button>
            </div>

            <div className={`${theme.card} rounded-2xl p-5
              shadow-sm`}>
              <h3 className={`font-bold mb-4 ${theme.text}`}>
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ icon: Icon, label, handle, color, bg }) => (
                  <button key={label}
                    className={`${theme.bgSecondary} rounded-xl
                      p-3 flex items-center gap-3
                      hover:scale-105 transition-transform`}>
                    <div className={`w-9 h-9 ${bg} rounded-lg
                      flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold ${theme.text}`}>
                        {label}
                      </p>
                      <p className={`text-xs ${theme.textSecondary}`}>
                        {handle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
