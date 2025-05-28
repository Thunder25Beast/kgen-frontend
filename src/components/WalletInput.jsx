
import { useState } from 'react';

const WalletInput = ({ value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isValidEthAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ethereum Wallet Address
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="0x1234567890abcdef1234567890abcdef12345678"
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 font-mono text-sm
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : value && isValidEthAddress(value)
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }
            ${isFocused ? 'ring-4 ring-opacity-20' : ''}
          `}
        />
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValidEthAddress(value) ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      <p className="text-xs text-gray-500">
        Enter a valid Ethereum wallet address starting with 0x
      </p>
    </div>
  );
};

export default WalletInput;
