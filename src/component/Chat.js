import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { IoIosContact } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link,useParams } from 'react-router-dom'

function Chat() {
    const params = useParams()
    const paramid = params.id
    const tid = useSelector(state => state.TitleReducer)
    const person = useSelector(state => state.user)
    const [allmesssage, setallMessage] = useState()
    const [message, setMessage] = useState()



    useEffect(() => {
        axios.get(`http://34.122.252.114:3000/conversations/${paramid}/messages`, { headers: { "user_id": person[0]?.id } })
            .then(res => {
                console.log(res);
                setallMessage(res.data)

            })
            .catch(err => console.log(err))
    }, [])
    console.log(allmesssage);
    const handleSend = () => {
        axios.post(`http://34.122.252.114:3000/conversations/${paramid}/messages`, { content: message },
            { headers: { "user_id": person[0].id } })
            .then(res => {
                axios.get(`http://34.122.252.114:3000/conversations/${paramid}/messages`, { headers: { "user_id": person[0]?.id } })
                    .then(res => {
                        setallMessage(res.data)

                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err))

    }
    return (
        <div className="container mt-5">
            <h1>{tid}</h1>
            {allmesssage && allmesssage.map((value, index) => {
                return <div className="contacts-convo container mt-4" key={index}>

                    <IoIosContact size="64" className="contact-icon" />
                    <div style={{ marginLeft: "10px" }} className="mt-1">
                        <span>{value?.content}</span><br />
                        {(person[0]?.id != value?.sender_id) ? <span style={{ color: "lightgray" }}>{value?.sender_name} at {value?.timestamp}</span> : <span style={{ color: "lightgray" }}>you at</span>}

                    </div>

                </div>
            })}
            <div className="title">
                <input placeholder="write something........" type="text" onChange={(e) => {
                    setMessage(e.target.value)
                }
                } />
                <Link to="" className="start-convo" onClick={() => { handleSend() }}>Send</Link>
            </div>
        </div>
    )
}

export default Chat
