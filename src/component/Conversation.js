import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosContact } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Conversation() {
    const person = useSelector(state => state?.user)
    const titleid = useSelector(state => state)
    const [state, setstate] = useState()
    const [message, setMessage] = useState()
    const [allmesssage, setallMessage] = useState()


    const tid = titleid?.TitleReducer
    useEffect(() => {
        if (tid != 0) {
            axios.get(`http://34.122.252.114:3000/conversations/${tid}`, { headers: { "user_id": person[0]?.id } })
                .then(res => setstate(res.data))
                .catch(err => console.log(err))



        }

    }, [tid])

    const handleSend = () => {
        axios.post(`http://34.122.252.114:3000/conversations/${tid}/messages`, { content: message },
            { headers: { "user_id": person[0].id } })
            .then(res => {
                axios.get(`http://34.122.252.114:3000/conversations/${tid}/messages`, { headers: { "user_id": person[0]?.id } })
                    .then(res => {
                        console.log(res);
                        setallMessage(res.data)
                        
                    })
                    .catch(err => console.log(err))
             
            })
            .catch(err => console.log(err))

    }
    return (
        <>
             <div>
                <h1 className="title-conversations container mt-5">{state?.title}</h1>
                {allmesssage && allmesssage.map((messages, index) => {
                    return <div className="contacts-convo container mt-4" key={index}>

                        <IoIosContact size="64" className="contact-icon" />
                        <div style={{ marginLeft: "10px" }} className="mt-1">
                            <span>{messages.content}</span><br />
                            {(person[0]?.id != messages?.sender_id) ? <span style={{ color: "lightgray" }}>{messages?.sender_name} at {messages.timestamp}</span> : <span style={{ color: "lightgray" }}>you at</span>}

                        </div>

                    </div>
                })}
                <div className="title container">
                    <input placeholder="write something........" type="text" onChange={(e) => {
                        setMessage(e.target.value)
                    }
                        } />
                    <Link to="" className="start-convo" onClick={() => { handleSend() }}>Send</Link>
                </div>
            </div>
        </>
    )

}

export default Conversation
