import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Trạng thái theo dõi tìm kiếm

  // Tải danh sách phim khi trang load lần đầu
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies'); // Giả sử API này trả về danh sách tất cả các phim có sẵn
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  // Hàm tìm kiếm phim
  const handleSearch = async (searchParams: any) => {
    const query = new URLSearchParams(searchParams).toString();
    console.log('Making request with query:', query);
    
    // Sửa lỗi fetch bằng cách thêm dấu nháy đơn
    const res = await fetch(`/api/search?${query}`);
    
    const data = await res.json();
    console.log('API response:', data);
    setMovies(data); // Cập nhật danh sách phim sau khi tìm kiếm
    setHasSearched(true); // Đánh dấu rằng đã có tìm kiếm
  };

  return (
    <div className="bg-black min-h-screen p-8">
      <SearchForm onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {movies.length > 0 ? (
          movies.map((movie: any) => (
            <div 
              key={movie.id} 
              className="relative group bg-gray-900 text-white border border-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={movie.thumbnailUrl} 
                alt={movie.title} 
                className="w-full h-64 object-cover group-hover:opacity-75"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate">{movie.title}</h3>
                <p className="text-sm mb-2">{movie.genre}</p>
                <p className="text-sm">{movie.duration}</p>
                <p className="text-gray-400 text-sm line-clamp-3">{movie.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {movie.description}
              </div>
            </div>
          ))
        ) : (
          hasSearched && ( // Hiển thị thông báo nếu đã tìm kiếm nhưng không có kết quả
            <p className="text-white">Không có phim nào phù hợp với tìm kiếm của bạn.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;