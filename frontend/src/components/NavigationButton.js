
export const NavigationButton = ({
    label,
    onClick,
    loading = false,
    type = "button",
  }) => (
    <button
      type={type}
      disabled={loading}
      className="text-2xl px-5 py-2.5 mx-2.5 border-none rounded-full bg-gray-800 text-gray-100 cursor-pointer shadow-md transition-transform duration-300 ease-in-out hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1.5 disabled:bg-gray-900"
      onClick={onClick}
    >
      {label}
    </button>
  );