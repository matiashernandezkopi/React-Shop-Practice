import React ,{ useState } from 'react'
import './App.css'
import { Sidebar } from './components/sidebar';
import { SelectedContent } from './components/selectedContent';
import { CarritoMiniatura } from './components/carritoMinuatura';
import { carritoArray } from './services/carrito';




function App() {
  const [content,setContent] = useState<string>("Main")
  
  
  

  return (
    <>
      
      <Sidebar setContent={setContent} content={content} />
      <main className=' ml-36 h-full'>
        <div className='h-full'>
          <SelectedContent content={content} />
        </div>
        <CarritoMiniatura carritoArray={carritoArray}/>
      </main> 
      
    </>
  
  )
}


export default App
