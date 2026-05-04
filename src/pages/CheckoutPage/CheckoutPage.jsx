import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Building2, Smartphone, Banknote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { formatPrice } from '../../utils/formatPrice';
import PaymentSuccess from './PaymentSuccess';

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Visa/Mastercard',
    icon: CreditCard
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct bank payment',
    icon: Building2
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    description: 'GoPay/OVO',
    icon: Smartphone
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when delivered',
    icon: Banknote
  }
];

const initialForm = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { cart } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState('');

  const subTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const shipping = cart.length > 0 ? 15000 : 0;
  const total = subTotal + shipping;
  const selectedPaymentLabel = paymentMethods.find((method) => method.id === selectedPayment)?.name || '';

  const inputClass = (field) => (
    `w-full rounded-xl ${theme.input} ${theme.text} border px-4 py-3 text-sm outline-none transition-colors placeholder-gray-500 ${
      errors[field] ? 'border-red-500' : `${theme.border} focus:border-[#4A90E2]`
    }`
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: !formData.fullName.trim(),
      phone: formData.phone.replace(/\D/g, '').length < 10,
      address: !formData.address.trim(),
      city: !formData.city.trim(),
      payment: !selectedPayment
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Please fill all required fields!');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      const order = addOrder({
        items: cart,
        total,
        paymentMethod: selectedPayment,
        address: formData
      });

      setOrderNumber(order.id);
      setIsSuccess(true);
      setStep(2);
    }
  };

  if (cart.length === 0 && step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${theme.bg} font-poppins flex flex-col items-center justify-center px-4 transition-colors duration-300`}
      >
        <p className={`${theme.textSecondary} mb-6 text-sm font-medium`}>Your cart is empty</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-[#4A90E2] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
        >
          Start Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${theme.bg} font-poppins pb-32 md:pb-10 transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 lg:px-16 pt-4 md:pt-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 -ml-2 rounded-full flex items-center justify-center active:scale-95 transition-transform ${theme.text}`}
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className={`text-xl md:text-2xl font-bold flex-1 text-center ${theme.text}`}>Checkout</h1>
          <div className="w-8" />
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center w-full max-w-sm">
            {[1, 2].map((progressStep) => {
              const isDone = progressStep < step || isSuccess;
              const isActive = progressStep === step;
              const label = progressStep === 1 ? 'Shipping' : 'Payment';

              return (
                <React.Fragment key={progressStep}>
                  <div className="flex flex-col items-center gap-2">
                    {isDone ? (
                      <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                        <Check size={18} color="white" />
                      </div>
                    ) : (
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-[#4A90E2] text-white' : `${theme.bgCard} ${theme.textSecondary} border ${theme.border}`
                      }`}>
                        {progressStep}
                      </div>
                    )}
                    <span className={`text-xs font-bold ${isDone ? 'text-green-500' : isActive ? 'text-[#4A90E2]' : theme.textSecondary}`}>
                      {label}
                    </span>
                  </div>
                  {progressStep === 1 && (
                    <div className={`flex-1 h-1 mx-3 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-[#4A90E2]'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="shipping-payment"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
            >
              <div className="space-y-6">
                <section className={`${theme.bgCard} border ${theme.border} rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300`}>
                  <h2 className={`text-lg font-bold mb-4 ${theme.text}`}>Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={formData.fullName}
                      onChange={(event) => handleChange('fullName', event.target.value)}
                      placeholder="Full Name"
                      className={inputClass('fullName')}
                    />
                    <input
                      value={formData.phone}
                      onChange={(event) => handleChange('phone', event.target.value)}
                      placeholder="Phone Number"
                      className={inputClass('phone')}
                    />
                    <textarea
                      value={formData.address}
                      onChange={(event) => handleChange('address', event.target.value)}
                      placeholder="Address"
                      rows={4}
                      className={`${inputClass('address')} md:col-span-2 resize-none`}
                    />
                    <input
                      value={formData.city}
                      onChange={(event) => handleChange('city', event.target.value)}
                      placeholder="City"
                      className={inputClass('city')}
                    />
                    <input
                      value={formData.postalCode}
                      onChange={(event) => handleChange('postalCode', event.target.value)}
                      placeholder="Postal Code"
                      className={inputClass('postalCode')}
                    />
                  </div>
                </section>

                <section className={`${theme.bgCard} border ${theme.border} rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300`}>
                  <h2 className={`text-lg font-bold mb-4 ${theme.text}`}>Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedPayment === method.id;

                      return (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedPayment(method.id);
                            if (errors.payment) {
                              setErrors((prev) => ({ ...prev, payment: false }));
                            }
                          }}
                          className={`p-4 rounded-xl border cursor-pointer transition-colors duration-300 ${
                            isSelected
                              ? 'border-[#4A90E2] bg-blue-50 dark:bg-[#4A90E2]/10'
                              : errors.payment
                                ? 'border-red-500'
                                : `${theme.border} ${theme.bgCard}`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#4A90E2]' : theme.border}`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#4A90E2]" />}
                            </div>
                            <Icon size={22} className={isSelected ? 'text-[#4A90E2]' : theme.textSecondary} />
                            <div>
                              <p className={`font-bold text-sm ${theme.text}`}>{method.name}</p>
                              <p className={`text-xs mt-0.5 ${theme.textSecondary}`}>{method.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {selectedPayment === 'credit-card' && (
                    <div className={`mt-5 pt-5 border-t ${theme.border}`}>
                      <h3 className={`font-bold text-sm mb-3 ${theme.text}`}>Credit Card Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          value={formData.cardNumber}
                          onChange={(event) => handleChange('cardNumber', event.target.value)}
                          placeholder="Card Number"
                          className={`${inputClass('cardNumber')} md:col-span-2`}
                        />
                        <input
                          value={formData.expiryDate}
                          onChange={(event) => handleChange('expiryDate', event.target.value)}
                          placeholder="Expiry Date"
                          className={inputClass('expiryDate')}
                        />
                        <input
                          value={formData.cvv}
                          onChange={(event) => handleChange('cvv', event.target.value)}
                          placeholder="CVV"
                          className={inputClass('cvv')}
                        />
                        <input
                          value={formData.cardholderName}
                          onChange={(event) => handleChange('cardholderName', event.target.value)}
                          placeholder="Cardholder Name"
                          className={`${inputClass('cardholderName')} md:col-span-2`}
                        />
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <aside className={`${theme.bgCard} border ${theme.border} rounded-2xl p-5 shadow-sm h-fit lg:sticky lg:top-24 transition-colors duration-300`}>
                <h2 className={`font-bold mb-4 ${theme.text}`}>Order Total</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Sub Total</span>
                    <span className={theme.text}>{formatPrice(subTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Shipping</span>
                    <span className={theme.text}>{formatPrice(shipping)}</span>
                  </div>
                  <div className={`border-t ${theme.border} pt-3 flex justify-between items-center`}>
                    <span className={`font-bold ${theme.text}`}>Total</span>
                    <span className="font-black text-lg text-[#4A90E2]">{formatPrice(total)}</span>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="hidden lg:block w-full mt-5 bg-[#4A90E2] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
                >
                  Continue to Payment
                </button>
              </aside>
            </motion.div>
          ) : (
            <PaymentSuccess
              key="success"
              orderNumber={orderNumber}
              total={total}
              paymentMethod={selectedPaymentLabel}
              items={cart}
            />
          )}
        </AnimatePresence>
      </div>

      {step === 1 && (
        <div className={`lg:hidden fixed bottom-0 left-0 right-0 px-4 z-40 ${theme.navBg} pt-3 pb-4 border-t ${theme.border} transition-colors duration-300`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${theme.textSecondary}`}>Order Total</span>
            <span className="font-black text-lg text-[#4A90E2]">{formatPrice(total)}</span>
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-[#4A90E2] text-white font-bold py-3.5 rounded-full shadow-[0_4px_15px_rgba(74,144,226,0.3)] hover:bg-blue-600 transition-all active:scale-95"
          >
            Continue to Payment
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CheckoutPage;
