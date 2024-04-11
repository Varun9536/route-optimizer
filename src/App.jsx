import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import './App.css'
import { toast } from 'react-hot-toast'

function App() {

  const [source, setsouce] = useState("")
  const [destination, setdestination] = useState("")
  const [optimizedRoute, setOptimizedRoute] = useState(false)
  const [ways, setways] = useState(false)



  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI("AIzaSyAl6L7gD-H_B17Boiez6jbozkPr-ubrYnI");

  async function route() {
    // For text-only input, use the gemini-pro model

    if (source.length < 1 || destination.length < 1) {
      toast.error(<h3 style={{color : "red"}}>Please Provide source and destination to get desired result</h3>)
      return
    }

    const id = toast.loading( <h2>Please wait......</h2> )

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `complete and efficient route from ${source} to ${destination} `

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); 
    setOptimizedRoute(text.split("."))

    toast.dismiss(id)

  }


  
  async function modes() {
    // For text-only input, use the gemini-pro model

    if (source.length < 1 || destination.length < 1) {
      toast.error(<h3 style={{color : "red"}}>Please Provide source and destination to get desired result</h3>)
      return
    }

    const id = toast.loading(<h2>Please wait....</h2>)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `types of transpotation available between ${source} to ${destination}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let s = text.split(".")
    setways(s)

    toast.dismiss(id)
  }


  return (
    <>

      <Box display={"flex"} flexDirection={"column"} boxShadow={"7px 7px 7px #ccc"} padding={"30px"}>

        <Typography variant='h4' color={"#a31aff"}>Get the  efficient and easiest way to travel from your Source to Destination</Typography>
        
        <InputLabel sx={{ marginTop: "25px ", marginBottom: "10px", fontWeight: "bold" }}>Enter your source</InputLabel>
        < TextField variant='outlined' onChange={(e) => setsouce(e.target.value)} />

        <InputLabel sx={{ marginTop: "25px ", marginBottom: "10px", fontWeight: "bold" }}>Enter your Destination</InputLabel>
        < TextField variant='outlined' onChange={(e) => setdestination(e.target.value)} />

        <Button variant='contained' color='success' fontWeight="bold" sx={{ marginTop: "20px", fontSize: "20px" }} onClick={route}>Get The Best Route</Button>
        <Button variant='contained' color='success' fontWeight="bold" sx={{ marginTop: "20px", fontSize: "20px" }} onClick={modes}> Get Modes of Transpotation</Button>
      </Box>


      <Box boxShadow={"7px 7px 7px #ccc"} padding={"30px"} >

        <Box border={1} padding={"15px"}>
          <Typography variant='h4' color={"#888844"} marginBottom={"15px"} > Route</Typography>
  
          {optimizedRoute === false ? <Typography>Enter details to get desired result</Typography> : optimizedRoute.map((item, index) =>
          (
            <Typography variant='h5' key={index}>{item}</Typography>
          ))}
        </Box>

        <Box marginTop={"50px"} border={1} padding={"15px"}>
          <Typography variant='h4' color={"#888844"} marginBottom={"15px"} >Modes of Travel</Typography>

          {ways === false ? <Typography>Enter details to get desired result</Typography> : ways.map((item, index) =>
          (
            <Typography variant='h5' key={index}>{item}</Typography>
          ))}
        </Box>
      </Box>

    </>
  )
}

export default App
