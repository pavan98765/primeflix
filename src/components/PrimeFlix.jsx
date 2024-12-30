import React, { useState } from 'react';
import { Play, Info, Search, Bell, User, Menu, ChevronDown } from 'lucide-react';

const PrimeFlix = () => {
  const categories = [
    {
      name: "Prime Originals",
      videos: [
        { 
          id: 1, 
          title: "The Boys Season 4", 
          description: "The hit superhero series returns with more action, drama, and darkly comedic moments.",
          trailerUrl: "EzFXDvC-EwM"
        },
        { 
          id: 2, 
          title: "Citadel", 
          description: "Elite agents of a global spy organization face a new threat after their memories are wiped.", 
          trailerUrl: "MBOhKd6cIak"
        },
        { 
          id: 3, 
          title: "The Lord of the Rings: The Rings of Power", 
          description: "Set thousands of years before The Hobbit, this epic drama explores Middle-earth's Second Age.", 
          trailerUrl: "v7v1hIkYH24"
        },
      ]
    },
    {
      name: "Trending Movies",
      videos: [
        { 
          id: 4, 
          title: "Dune: Part Two", 
          description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
          trailerUrl: "Way9Dexny3w"
        },
        { 
          id: 5, 
          title: "The Batman", 
          description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.", 
          trailerUrl: "mqqft2x_Aa4"
        },
        { 
          id: 6, 
          title: "Oppenheimer", 
          description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", 
          trailerUrl: "bK6ldnjE3Y0"
        },
      ]
    },
    {
      name: "Popular TV Shows",
      videos: [
        { 
          id: 7, 
          title: "House of the Dragon", 
          description: "The story of the House Targaryen, set 200 years before the events of Game of Thrones.", 
          trailerUrl: "DotnJ7tTA34"
        },
        { 
          id: 8, 
          title: "The Last of Us", 
          description: "Joel and Ellie, a pair connected through the harshness of the world they live in, are forced to endure brutal circumstances.", 
          trailerUrl: "uLtkt8BonwM"
        },
        { 
          id: 9, 
          title: "Stranger Things 5", 
          description: "New supernatural threats terror Hawkins as Eleven struggles to regain her powers.", 
          trailerUrl: "pMRePAxn1-I"
        },
      ]
    },
    {
      name: "Trending Now",
      videos: [
        { 
          id: 4, 
          title: "Saltburn", 
          description: "A story of obsession at an aristocrat's estate turns dark and twisted.", 
          trailerUrl: "lALMdJf6UUE"
        },
        { 
          id: 5, 
          title: "Mr. & Mrs. Smith", 
          description: "Two spies married to each other navigate their dangerous double lives.", 
          trailerUrl: "AsaMWxppznk"
        },
        { 
          id: 6, 
          title: "Fallout", 
          description: "Based on the hit game series, survivors emerge from their vaults into a post-apocalyptic world.", 
          trailerUrl: "V-mugKDQDlg"
        },
      ]
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const getThumbnailUrl = (videoId, quality = 'maxres') => {
    switch(quality) {
      case 'maxres':
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      case 'hq':
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      default:
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
  };

  const VideoCard = ({ video }) => {
    const [thumbnailError, setThumbnailError] = useState(false);

    return (
      <div 
        className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setSelectedVideo(video)}
      >
        <img 
          src={thumbnailError ? getThumbnailUrl(video.trailerUrl, 'hq') : getThumbnailUrl(video.trailerUrl)}
          alt={video.title}
          className="w-full h-48 object-cover rounded-md"
          onError={() => setThumbnailError(true)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-md">
          <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <h3 className="text-white font-bold">{video.title}</h3>
            <div className="flex space-x-2 mt-2">
              <button className="bg-yellow-500 text-black px-4 py-1 rounded-md flex items-center hover:bg-yellow-400">
                <Play size={16} className="mr-1" />
                Play
              </button>
              <button className="bg-gray-800 text-white px-4 py-1 rounded-md flex items-center hover:bg-gray-700">
                <Info size={16} className="mr-1" />
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoModal = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-4 max-w-4xl w-full">
        <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.trailerUrl}?autoplay=1`}
            title={`${video.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-300 mb-4">{video.description}</p>
        <button 
          className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900 z-40 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500">PrimeFlix</h1>
            <nav className="hidden md:flex space-x-4">
              <div className="relative">
                <button 
                  className="flex items-center hover:text-yellow-500"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Browse <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {showMenu && (
                  <div className="absolute top-full left-0 bg-gray-800 rounded-md py-2 w-48">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Home</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">TV Shows</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Movies</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">Kids</button>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
            <Bell className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
            <User className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
            <Menu className="md:hidden w-5 h-5 cursor-pointer hover:text-yellow-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 mb-8">
          <img 
            src={getThumbnailUrl(categories[0].videos[0].trailerUrl)}
            alt="Featured Content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">The Boys Season 4</h2>
              <p className="text-lg mb-4 max-w-xl">
                The hit superhero series returns with more action, drama, and darkly comedic moments as the fight against corrupt supes continues.
              </p>
              <div className="flex space-x-4">
                <button 
                  className="bg-yellow-500 text-black px-8 py-2 rounded-md flex items-center hover:bg-yellow-400"
                  onClick={() => setSelectedVideo(categories[0].videos[0])}
                >
                  <Play size={24} className="mr-2" />
                  Play
                </button>
                <button className="bg-gray-800 text-white px-8 py-2 rounded-md flex items-center hover:bg-gray-700">
                  <Info size={24} className="mr-2" />
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Categories */}
        <div className="px-4 md:px-8 space-y-8 pb-8">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default PrimeFlix;