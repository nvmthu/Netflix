import { useState } from 'react';

const SearchForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with parameters:', { genre, title, duration });
    onSearch({ genre, title, duration });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 p-6 bg-gray-800 rounded-lg shadow-lg max-w-full mx-auto">
      <input
        type="text"
        placeholder="Thể loại"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full p-3 bg-gray-900 text-white placeholder-gray-500 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
      <input
        type="text"
        placeholder="Tên phim"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 bg-gray-900 text-white placeholder-gray-500 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
      <input
        type="text"
        placeholder="Độ dài phim (ví dụ: 10 minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-3 bg-gray-900 text-white placeholder-gray-500 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="py-3 px-6 bg-red-600 text-white rounded hover:bg-red-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchForm;