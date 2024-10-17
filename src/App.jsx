import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Footer from './components/Footer'


function App() {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  
  function handleToggleModal() {
    setShowModal(!showModal)
  }
  
  useEffect(() => {
    async function fetchApiData() {
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_API_KEY}`

      const today = (new Date()).toDateString()
      const localKey =`NASA-${ today }`
      if (localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched Local Data')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        setData(apiData)

        localStorage.setItem(localKey, JSON.stringify(apiData))
        
        console.log('Data: ', apiData )
        console.log('Fetched Api Data')
      }
      catch(error){
        console.log(error.message)
      }
    } 
    fetchApiData()    
  }, []) 

  return (
    <>
      { data ? (<Main data = { data }/>) : (
        <div className="loadingState">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      { showModal &&(<Sidebar data = { data } handleToggleModal = { handleToggleModal }/>) }
      <Footer data = { data } handleToggleModal = { handleToggleModal }/>
    </>
   
  )
}

export default App
