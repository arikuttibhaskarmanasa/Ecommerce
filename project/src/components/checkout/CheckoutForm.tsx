import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { ShippingAddress } from '../../types';

const initialAddress: ShippingAddress = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  phoneNumber: '',
};

interface CheckoutFormProps {
  onSubmit: (address: ShippingAddress, paymentMethod: string) => void;
}

const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping form
    for (const [key, value] of Object.entries(shippingAddress)) {
      if (!value.trim()) {
        alert(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onSubmit(shippingAddress, paymentMethod);
      setIsProcessing(false);
    }, 1500);
  };

  const goBack = () => {
    if (step === 1) {
      navigate('/cart');
    } else {
      setStep(1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className="text-center flex-1">
            <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 ${
              step >= 1 ? 'border-primary-600 bg-primary-100' : 'border-gray-300'
            }`}>
              <span className={`text-sm font-medium ${
                step >= 1 ? 'text-primary-600' : 'text-gray-500'
              }`}>1</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Shipping</p>
          </div>
          <div className="flex-1 relative">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200" aria-hidden="true">
              <div className={`h-full bg-primary-600 transition-all duration-300 ${
                step >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          </div>
          <div className="text-center flex-1">
            <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 ${
              step >= 2 ? 'border-primary-600 bg-primary-100' : 'border-gray-300'
            }`}>
              <span className={`text-sm font-medium ${
                step >= 2 ? 'text-primary-600' : 'text-gray-500'
              }`}>2</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Payment</p>
          </div>
        </div>
      </div>

      {/* Step 1: Shipping Information */}
      {step === 1 && (
        <form onSubmit={handleShippingSubmit} className="animate-fadeIn">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={shippingAddress.phoneNumber}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="save-info"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="save-info" className="ml-2 text-sm text-gray-700">
              Save this information for next time
            </label>
          </div>
          
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={goBack}
              className="btn btn-outline"
            >
              Back to Cart
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Payment Information */}
      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} className="animate-fadeIn">
          <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
          
          <div className="mb-6">
            <div className="space-y-4">
              <div className="relative border rounded-md p-4 flex cursor-pointer bg-gray-50 border-primary-600">
                <input
                  id="credit-card"
                  name="payment-method"
                  type="radio"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
                />
                <label htmlFor="credit-card" className="ml-3 flex flex-col cursor-pointer">
                  <span className="block text-sm font-medium text-gray-900">Credit / Debit Card</span>
                  <span className="block text-sm text-gray-500">Pay securely with your card</span>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="h-6 w-10 bg-blue-100 rounded flex items-center justify-center text-xs font-medium text-blue-800">
                      Visa
                    </div>
                    <div className="h-6 w-10 bg-red-100 rounded flex items-center justify-center text-xs font-medium text-red-800">
                      MC
                    </div>
                    <div className="h-6 w-10 bg-green-100 rounded flex items-center justify-center text-xs font-medium text-green-800">
                      Amex
                    </div>
                  </div>
                </label>
                <CreditCard className="h-5 w-5 text-primary-600 absolute right-4 top-4" />
              </div>
              
              <div className="relative border rounded-md p-4 flex cursor-pointer">
                <input
                  id="paypal"
                  name="payment-method"
                  type="radio"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
                />
                <label htmlFor="paypal" className="ml-3 flex flex-col cursor-pointer">
                  <span className="block text-sm font-medium text-gray-900">PayPal</span>
                  <span className="block text-sm text-gray-500">Pay with your PayPal account</span>
                </label>
              </div>
            </div>
          </div>
          
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="•••• •••• •••• ••••"
                  className="input"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expiration"
                    placeholder="MM/YY"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="•••"
                    className="input"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm text-gray-600">
                  Your payment information is secure and encrypted
                </span>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Billing Address</h3>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="same-address"
                checked={true}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="same-address" className="ml-2 text-sm text-gray-700">
                Same as shipping address
              </label>
            </div>
          </div>
          
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn btn-outline"
            >
              Back to Shipping
            </button>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary relative disabled:opacity-80"
            >
              {isProcessing ? (
                <>
                  <span className="opacity-0">Complete Order</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                'Complete Order'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;