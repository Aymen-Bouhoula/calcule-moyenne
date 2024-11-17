import React, { useEffect, useState } from 'react'
import Calcul from './components/Calcul'
import axios from 'axios'



const App = () => {

  const [data, setdata] = useState([])
  async function getNotes() {
    try {
      const response = await axios.get('http://localhost:5000/notes')
      setdata(response.data)
    } catch (error) {
      console.log(error.message);
          }
  }

  useEffect(() => {
  getNotes()
  }, [])



  async function addNotes(note) {
    try {
      const response = await axios.post('http://localhost:5000/notes',note)
      setdata([...data, response.data])
    } catch (error) {
      console.log(error.message);
      
    }
  }

    return (
          <div>
      <Calcul  addNotes={addNotes} />


    </div>
  )
}

export default App

