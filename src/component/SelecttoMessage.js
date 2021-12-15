import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosContact } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { titleid } from './action/action';




function SelecttoMessage() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const tid= useSelector(state => state.TitleReducer)

    const person = useSelector(state => state.user)
    const selectedlist = useSelector(state => state.SelectcontactReducer)
    const [title, settitle] = useState('')
    const [contact_ids, setid] = useState([])


    useEffect(() => {
        const data = []
        selectedlist.map(value => {
            const idval = value.value.id
            data.push(idval)

        })
        setid(data)

    }, [])

    const startConvoBtn = () => {
        console.log(title);
        axios.post('http://34.122.252.114:3000/conversations', { title: title, contact_ids: contact_ids },
            { headers: { "user_id": person[0].id } })
            .then(res => {
                console.log('resssssssssssss', res.data.id);
                const iddata = res?.data?.id
                dispatch(titleid(iddata))
                if(tid!=0){

                    Navigate('/conversations')
                }
            
            })
            .catch(err => console.log(err))

    }
    return (
        <div>
            <p className="y-heading">Welcome {localStorage.getItem('user_name')}</p>
            <p className="y-second-heading">Give title to start conversation with {selectedlist?.length} participants</p>
            <div className="selected-to-message-contacts">
                {selectedlist && selectedlist.map((value, index) => {
                    return <div className="contacts ">

                        <IoIosContact size="64" className="contact-icon" />
                        <div>
                            <p>{value.value?.name}</p>
                            <p>hey! i am using whatsapp</p>
                        </div>

                    </div>

                })}
            </div>

            <div className="title container">
                <input placeholder="enter title" type="text" onChange={(e) => settitle(e.target.value)} />
                <Link to="/conversations" className="start-convo" onClick={() => { startConvoBtn() }}>start conversation</Link>
            </div>
        </div>
    )
}

export default SelecttoMessage
