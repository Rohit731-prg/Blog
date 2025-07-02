import { create } from 'zustand'

const useImageStore = create((set) => ({
  images: [
    "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645896.jpg?ga=GA1.1.162254289.1730966228&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/fantasy-style-galaxy-background_23-2151114325.jpg?ga=GA1.1.162254289.1730966228&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546189.jpg?ga=GA1.1.162254289.1730966228&semt=ais_hybrid&w=740"
  ],
}))

export default useImageStore