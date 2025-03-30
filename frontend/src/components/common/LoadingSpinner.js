const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-2 border-solid ${sizeClasses[size]} ${colorClasses[color]} border-t-transparent`}
      />
    </div>
  );
};

export default LoadingSpinner;