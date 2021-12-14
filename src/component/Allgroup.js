import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosContact } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Allgroup() {
    const person = useSelector(state => state?.user)
    const [allconversations, setallconversations] = useState()
    console.log(person);
    useEffect(() => {
        axios.get(`http://34.122.252.114:3000/conversations`, { headers: { "user_id": 8 } })
            .then(res => {
                setallconversations(res.data)
            })

            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container">
            <h1 className="mt-5">Your conversations</h1>
            {allconversations && allconversations.map((value, index) => {
                return <div className="contacts-convo container mt-4" key={index}>

                    <IoIosContact size="64" className="contact-icon" />
                    <div>
                        <span>{value.title}</span>
                        <br />
                        <span>you at</span><br />
                        <span>{value.last_message[0]?.content}</span>

                    </div>

                </div>
            })

            }
            <Link to="" className="create-new">Create New Conversation</Link>
        </div>

    )
}

export default Allgroup
