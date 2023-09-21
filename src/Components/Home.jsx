/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./Navbar";
import ClipLoader from "react-spinners/ClipLoader";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
 
const SortableImage = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } 
    = useSortable({ id: image.photographer })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div className="card" ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div className="img-container">
        <img src={image.src.medium}
          className="img"
          alt={image.alt} />
          <div className="topleft">{image.photographer}</div>
      </div>
    </div>
  )
}

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
      setImages(response.data.photos.slice(0, 12))
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPhotos()
  }, []);
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
                .filter(image => image.photographer.toLowerCase().indexOf(searchImages.toLowerCase()) !== -1)
                .map((image, index) => (
                <SortableImage key={index} image={image}></SortableImage>
              ))}
            </SortableContext>
          </DndContext>
        </div> }
      <footer>
        <p>Copyright by <span>Kindness Okpugie</span></p>
      </footer>
    </>
  )
}

export default Home;
