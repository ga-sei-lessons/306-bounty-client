import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BountyForm from "../partials/BountyForm"
import axios from "axios"

export default function Home() {
    // state to hold the data payload from our backend
    const [bounties, setBounties] = useState([])
    // show/hide bounty creation form
    const [showForm, setShowForm] = useState(false)
    // useEffect to get the data payload from our backend
    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVER_URL}/bounties`
        axios.get(url)
            .then(response => {
                setBounties(response.data.results)
            })
            .catch(console.warn)
    }, [])
    // console.log(process.env.REACT_APP_SERVER_URL)

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        console.log("form has submitted!")
        console.log(form)
        // POST a bounty
        try {
            // axios.post(url, request body, { options })
            // post the new bounty to the backed
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/bounties`, form) // ignoring return value of the server's response
            // if the response with success, we want to get request to see all
            const allBounties = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bounties`)
            setBounties(allBounties.data.results) //update state
            setShowForm(false) //close the form
        } catch (err) {
            // mongoose errors would wind up here
            // display relevant errors to user if needed
            // set error message state to display to the user
            console.warn(err)
        }

    }

    const handleCancelClick = () => setShowForm(false)

    const initialState = {
        name: "",
        wantedFor: "",
        client: "",
        ship: "",
        reward: 0,
        captured: false,
        lastSeen: ""
    }

    const bountyListItems = bounties.map(bounty => {
        return (
            <li key={`bounty-li ${bounty._id}`}>
                <Link to={`/bounties/${bounty._id}`}>
                    {bounty.name} : ${bounty.reward}
                </Link>
            </li>
        )
    })

    return (
        <div>
            <h1>Bounty App</h1>
            <p> {bounties.length === 0 && "loading bounties..."} </p>

            {/* short circuiting */}
            {!showForm && <button
                onClick={() => setShowForm(true)}
            >
                Show Bounty Creation Form
            </button>}

            {!showForm ?
            <ul>
                {bountyListItems}
            </ul> :
                <BountyForm 
                    initialState={initialState}
                    handleCancelClick={handleCancelClick}
                    handleSubmit={handleSubmit}
                />
            }
        </div>
    )
}