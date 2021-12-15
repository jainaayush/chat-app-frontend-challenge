import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { IoIosContact } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { selectcontactlst, titleid } from './action/action'


function SelectContact() {
    const Navigate = useNavigate()
    
    const person = useSelector(state => state.user)
    const selectedlist = useSelector(state => state.SelectcontactReducer)
    const dispatch = useDispatch()
    const [yourconvo, setyourConvo] = useState()
    const [contactList, setcontactList] = useState()
    const [selectedcontactlist, setselectedcontactlist] = useState([])
    const [showcontinue, setshowcontinue] = useState()
    useEffect(() => {

        axios.get(`http://34.122.252.114:3000/conversations`, { headers: { "user_id": localStorage.getItem('user_id') } })
            .then(res => {
                console.log('yourconvo',res);
                setyourConvo(res.data)
            })

        axios.get('http://34.122.252.114:3000/contacts')
            .then(res => {
                const data = res.data
                const filterperson = data.filter(value => value.name != person[0]?.name)
                setcontactList(filterperson)

            })
            .catch(err => console.log(err))

            .catch(err => console.log(err))
    }, [])

    const handleYourself = (value) => {
        if (!showcontinue) {
            setselectedcontactlist([...selectedcontactlist, { value }])
            setshowcontinue(true)

        }
        else {
            selectedcontactlist.map(data => {
                console.log('data', data.value);
                console.log(data.value.name, value.name);
                if (data.value.name != value.name) {
                    setselectedcontactlist([...selectedcontactlist, { value }])
                }
            })
        }

    }
    const handleContinue = () => {

        dispatch(selectcontactlst(selectedcontactlist))
    }

    const ShowChat = (value) => {
        dispatch(titleid(value.title))
        Navigate(`/chat/${value?.id}`)
        
    }
    

    return (
        <div className="container">

                {yourconvo ? <>
                <h1 className="mt-5">Your Conversations</h1>

                {yourconvo.map((value, index) => {
                    return <div className="contacts-convo py-2" key={index} onClick={()=>{ShowChat(value)}}>

                        <IoIosContact size="90" className="contact-icon" />
                        <div>
                            <span>{value.title}</span>
                            <br />
                            <span>you at</span><br />
                            <span style={{ fontWeight: "lighter" }}>{value.last_message[0]?.content}</span>

                        </div>

                    </div>
                })}
                <Link to="/createNew" className="create-new" >Create New Conversation</Link>
            </>

                :
                <>
                    <p className="y-heading">Welcome {localStorage.getItem('user_name')}</p>
                    <p className="y-heading" style={{ color: "lightgray" }}>You dont have any conversations</p>


                    <h3 className="y-heading">select contacts to message</h3>

                    {contactList && contactList.map((value, index) => {
                        return <div className="contacts" key={index}>

                            <IoIosContact size="64" onClick={() => { handleYourself(value) }} className="contact-icon" />
                            <div>
                                <span>{value.name}</span><br />
                                <span style={{ color: "lightgray" }} className="mt-2">hey! i am using whatsapp</span>
                            </div>

                        </div>

                    })}
                    {showcontinue && <Link to="/select-to-message" onClick={() => { handleContinue() }} className="contact-continue">continue</Link>}
                </>
            }

        </div>
    )
}

export default SelectContact
