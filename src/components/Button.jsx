import { FaSpinner } from 'react-icons/fa';

export default function Button({ loading = false, onClick, className, children }) {
  const clazz = [
    " bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50", className,
  ].join(' ');

  const handleCLick = () => {
    if (loading) {
      return
    }
    onClick();
  };

  return (
    <button className={clazz} onClick={handleCLick} disabled={loading}>
      <span className='flex items-center justify-center '>
        {loading && <FaSpinner className='animate-spin mr-2' />}
        {children}
      </span>
    </button>);
};

