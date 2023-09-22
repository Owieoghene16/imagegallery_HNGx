/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./Navbar";
import { motion } from "framer-motion"
import ClipLoader from "react-spinners/ClipLoader";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } 
    = useSortable({ id: image.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <motion.div 
      drag 
      dragConstraints={{
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      }}
      className="card" 
      ref={setNodeRef} 
      {...attributes} {...listeners} 
      style={style}
    >
      <div className="img-container">
        <img src={`https://image.tmdb.org/t/p/w500${image.poster_path}`}
          className="img"
          alt={image.alt} />
          <div className="topleft">{image.original_title}</div>
      </div>
    </motion.div>
  )
}


const Home = () => {
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState('');
  const [loading, setLoading] = useState(true);

  const getPhotos = async () => {
    try {
      const response =  await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
        params: {
          api_key: 'b991de6ee9dc8e55c2bcc7a20cc0a756',
          language: 'en-US',
          page: 1
        },
      });
      setImages(response.data.results.slice(0, 15))
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const onDragEnd = (e) => {
    const { active, over } = e;
    if(active.id === over.id) {
      return;
    }
    setImages((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      return arrayMove(images, oldIndex, newIndex);
    })
  }

  useEffect(() => {
    getPhotos();
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
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={images} strategy={verticalListSortingStrategy}>
        { images
           .filter(image => image.original_title.toLowerCase().indexOf(searchImages.toLowerCase()) !== -1)
           .map((image) => (
            <SortableItem key={image.id} image={image}></SortableItem>
        ))}
          </SortableContext>
        </DndContext>
      </div>}
      <footer>
        <p>Copyright by <span>Kindness Okpugie</span></p>
      </footer>
    </>
  )
}

export default Home;