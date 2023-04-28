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
        lastSeen: ""
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

                <div>
                    <label htmlFor="wantedFor">Wanted For:</label>

                    <input 
                        type="text"
                        placeholder="enter the crime"
                        id="wantedFor"
                        value={form.wantedFor}
                        onChange={e => setForm({ ...form, wantedFor: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="client">Client:</label>

                    <input 
                        type="text"
                        placeholder="enter your name"
                        id="client"
                        value={form.client}
                        onChange={e => setForm({ ...form, client: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="ship">Ship:</label>

                    <input 
                        type="text"
                        placeholder="enter the bounty's ship"
                        id="ship"
                        value={form.ship}
                        onChange={e => setForm({ ...form, ship: e.target.value })}
                    />
                </div>


                <div>
                    <label htmlFor="reward">Reward:</label>

                    <input 
                        type="number"
                        placeholder="enter posted reward amount"
                        id="reward"
                        value={form.reward}
                        onChange={e => setForm({ ...form, reward: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="captured">is captured:</label>

                    <input 
                        type="checkbox"
                        id="captured"
                        value={form.captured}
                        onChange={() => setForm({ ...form, captured: !form.captured })}
                    />
                </div>

                <div>
                    <label htmlFor="lastSeen">Last Seen At:</label>

                    <input 
                        type="text"
                        placeholder="enter place last seen"
                        id="lastSeen"
                        value={form.lastSeen}
                        onChange={e => setForm({ ...form, lastSeen: e.target.value })}
                    />
                </div>

                <button type="submit">Submit</button>
           </form>

           <button onClick={props.handleCancelClick}>Cancel</button>
        </div>
    )
}