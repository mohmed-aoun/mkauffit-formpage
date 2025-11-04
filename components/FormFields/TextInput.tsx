import React from 'react';

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-field">
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'
        }`}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleChange}
        onBlur={onBlur}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
