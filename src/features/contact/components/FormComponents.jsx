import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

/**
 * Reusable form input field with clean minimal styling
 * Features: Clear labels, visible placeholders, character counter
 */
export const FormField = ({
  name,
  label,
  type = 'text',
  icon: Icon,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
  isTextarea = false,
  rows = 4,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const maxLength = isTextarea ? 1000 : 500;
  const charCount = value?.length || 0;
  const isValid = value && value.trim() !== '';

  const placeholders = {
    f_name: 'John',
    l_name: 'Doe',
    email: 'you@example.com',
    subject: 'How can we help?',
    message: 'Share your thoughts, questions, or how we can support you...',
  };

  const placeholder = placeholders[name] || label;

  return (
    <div className="relative group">
      {/* Floating Label */}
      <label
        className={`absolute left-4 transition-all duration-200 font-medium bg-white px-0.5 pointer-events-none z-10 ${
          focused || value
            ? 'text-xs -top-2 text-blue-600 z-20'
            : 'top-4 text-sm text-gray-600 group-focus-within:text-xs group-focus-within:-top-2 group-focus-within:text-blue-600'
        }`}
      >
        {label}
        {required && <span className="text-amber-500 ml-0.5">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute transition-all duration-300 transform -translate-y-1/2 left-3 top-1/2">
            <Icon
              className={`w-5 h-5 transition-colors duration-200 ${
                focused || value
                  ? 'text-blue-500'
                  : 'text-gray-400'
              }`}
            />
          </div>
        )}

        {/* Success Indicator */}
        {isValid && isTextarea === false && (
          <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        )}

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Textarea */}
        {isTextarea ? (
          <div className="relative">
            <textarea
              name={name}
              rows={rows}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`w-full pl-10 pr-3 py-3 rounded-lg border-2 transition-all duration-200 resize-none placeholder:text-gray-500 placeholder:font-medium focus:outline-none relative z-10 bg-white ${
                focused
                  ? 'border-blue-500 shadow-sm shadow-blue-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              required={required}
            />
            <div className="absolute bottom-2.5 right-3 text-xs text-gray-400">
              {charCount}/{maxLength}
            </div>
          </div>
        ) : (
          <input
            type={showPassword ? 'text' : type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full pl-10 pr-3 py-3 rounded-lg border-2 transition-all duration-200 placeholder:text-gray-500 placeholder:font-medium focus:outline-none relative z-10 bg-white ${
              focused
                ? 'border-blue-500 shadow-sm shadow-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            required={required}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Contact info card with clean styling
 */
export const ContactInfoCard = ({ icon: Icon, title, value, href, type = 'text' }) => {
  const content = (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-blue-50 group-hover:bg-blue-100">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">{title}</p>
        <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={type === 'social' ? '_blank' : undefined}
        rel={type === 'social' ? 'noopener noreferrer' : undefined}
        className="p-4 transition-all duration-200 bg-white border border-gray-200 rounded-lg group hover:bg-gray-50 hover:border-blue-300"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg group">
      {content}
    </div>
  );
};

/**
 * Social media links grid
 */
export const SocialLinksGrid = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-gray-600 transition-all duration-200 transform bg-gray-100 border border-gray-200 rounded-lg w-11 h-11 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 active:scale-95"
          aria-label={social.label}
          title={social.label}
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};
