import { useState } from "react"

export default function BountyForm(props) {
/*
    props for initial state
    {
        name: "",
        wantedFor: "",
        client: "",
        ship: "",
        reward: 0,
        captured: false,
        lastSend: ""
    }
*/

    const [form, setForm] = useState(props.initialState)
    return (
        <div>
           <form onSubmit={e => props.handleSubmit(e, form)}>
                <div>
                    <label htmlFor="name">Name:</label>

                    <input 
                        type="text"
                        placeholder="enter name"
                        id="name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </div>
           </form>

           <button onClick={props.handleCancelClick}>Cancel</button>
        </div>
    )
}