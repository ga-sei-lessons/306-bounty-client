import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
    // state to hold the data payload from our backend
    const [bounties, setBounties] = useState([])
    // useEffect to get the data payload from our backend
    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVER_URL}/bounties`
        axios.get(url)
            .then(response => {
                console.log(response.data)
            })
            .catch(console.warn)
    }, [])
    console.log(process.env.REACT_APP_SERVER_URL)

    return (
        <div>
            home
        </div>
    )
}