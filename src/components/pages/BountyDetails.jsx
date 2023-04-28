import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import BountyForm from "../partials/BountyForm"
import axios from "axios"

export default function BountyDetails() {
    // hold the bounty we are currently looking at
    const [bounty, setBounty] = useState({})
    // is the edit form being shown or not?
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`)
            .then(response => {
                setBounty(response.data.result)
            })
            .catch(console.warn)
    }, [])

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        console.log(form)
        console.log('updated bounty!')
        try {
            const putResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`, form)
            console.log('updated bounty response:', putResponse.data)
            setBounty(putResponse.data.result)
            setShowForm(false)

        } catch (err) {
            console.log(err)
        }
    }

    const initialState = {
        name: bounty.name,
        wantedFor: bounty.wantedFor,
        client: bounty.client,
        ship: bounty.ship,
        captured: bounty.captured,
        lastSeen: bounty.lastSeen,
        reward: bounty.reward
    }

    const details = (
        <>
            <h1>Details for {bounty.name}</h1>

            <h2>${bounty.reward}</h2>

            <p>wanted for {bounty.wantedFor} by {bounty.client}</p>

            <p>last seen at {bounty.lastSeen} traveling in {bounty.ship}</p>

            <p>{bounty.captured ? "in captivity" : "still at large"}</p>
        </>
    )
    
    const form = (
        <>
            <h1>Edit Form for {bounty.name}</h1>

            <BountyForm 
                initialState={initialState}
                handleSubmit={handleSubmit}
                handleCancelClick={() => setShowForm(false)}

            />
        </>
    ) 

    return (
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>Edit</button>}
            {showForm ? form : details}
        </div>
    )
}