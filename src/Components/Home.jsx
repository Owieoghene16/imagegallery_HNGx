import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./Navbar";
import { motion } from "framer-motion"
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState('')
  const [loading, setLoading] = useState(true)

  const getPhotos = async () => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=car&per_page=40`, {
        headers: {
          Authorization: import.meta.env.VITE_API_KEY
        }
      })
      setImages(response.data.photos)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPhotos()
  }, []);


  return (
    <>
    <NavBar 
      setSearchImages={setSearchImages}
      searchImages={searchImages}
    />
    {loading ? 
      <div className='loaded-center'> 
      <ClipLoader
        color={'white'}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div> :
        <div className="container" >
        { images
           .slice(0, 15)
           .filter(image => image.photographer.toLowerCase().indexOf(searchImages.toLowerCase()) !== -1)
           .map((image, index) => (
          <motion.div
            drag
            className="card"
            key={index}
          >
            <div className="img-container">
              <img src={image.src.medium}
                className="img"
                alt={image.alt} />
                <div className="topleft">{image.photographer}</div>
            </div>
          </motion.div>
        ))}
      </div>}
      <footer>
        <p>Copyright by <span>Kindness Okpugie</span></p>
      </footer>
    </>
  )
}

export default Home;