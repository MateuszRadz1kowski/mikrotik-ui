import { useState } from "react"
import Chip from '@mui/material/Chip';
import { useEffect } from "react";


export default function M_status(){

    const [connected,setConnected] = useState(false)
    const [cpu,setCpu] = useState("")
    const [ram,setRam] = useState("")

    const getData = async()=>{

        try{
        const response = await fetch("http://172.16.15.106:3000/status")
        const json = await response.json()
        console.log(json)
        setCpu(json['cpu-load'])
        setRam(json['free-memory'])
        setConnected(true)
        }
        catch(error){
            setCpu("")
            setRam("")
            setConnected(false)
        }
        console.log("called")
    }

    

    setInterval(()=>{
        getData()
    },50000)

    return(
        <div>
            {
                connected ? <Chip label="connected" color="green" /> : <Chip label="error" color="red" />

            }
             <p>{cpu}</p>
             <p>{ram}</p>
        </div>
    )
}