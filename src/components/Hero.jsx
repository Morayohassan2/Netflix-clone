// Hero.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints, { createImageUrl } from '../services/movieServices';
import Modal from './Modal';

const Hero = () => {
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(endpoints.popular, {
      params: {
        api_key: import.meta.env.VITE_TMDB_KEY,
      },
    }).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      
      setMovie(randomMovie);

      
      fetchTrailerKey(randomMovie.id);
    });
  }, []);

  const fetchTrailerKey = (movieId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_KEY,
      },
    })
      .then((response) => {
        const trailers = response.data.results;
        const firstTrailer = trailers.find(trailer => trailer.type === 'Trailer');

        if (firstTrailer) {
          setTrailerKey(firstTrailer.key);
        }
      })
      .catch((error) => {
        console.error('Error fetching trailer:', error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!movie || !trailerKey) {
    return (
      <>
        <p>Fetching movie...</p>
      </>
    );
  }

  const { title, backdrop_path, release_date, overview } = movie;


  return (
    <div className="w-full h-[550px] lg:h-[850px]">
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover object-top"
          src={createImageUrl(backdrop_path, 'original')}
          alt={title}
        />

        {/* Content Overlay */}
        <div className="absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8">
          <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>

          {/* Buttons */}
          <div className="mt-8 mb-4">
            {/* Play Trailer Button */}
            {trailerKey && (
              <button
                onClick={openModal}
                className="capitalize border bg-gray-300 text-black py-1 px-4"
              >
                Play Trailer
              </button>
            )}

            <button className="capitalize border border-gray-300 py-1 ml-4 px-2">Watch Later</button>
          </div>

          {/* Movie Details */}
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]   text-gray-200">{overview}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal} trailerKey={trailerKey} />
      )}
    </div>
  );
};

export default Hero;






