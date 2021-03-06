import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosContact } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setuser } from './action/action';


function Yourself() {
    const dispatch = useDispatch()
    const [contactList, setcontactList] = useState()
    const [showcontinue, setshowcontinue] = useState(false)
    const [color, setcolor] = useState(false)
    const [oldvalue, setoldvalue] = useState()


    const [person, setPerson] = useState()
    useEffect(() => {
        axios.get('http://34.122.252.114:3000/contacts')
            .then(res => {
                setcontactList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleYourself = (value) => {
        setshowcontinue(true)
        setcolor(!color)
        setPerson(value)
        dispatch(setuser(value))
        localStorage.setItem('user_id', value.id)
        localStorage.setItem('user_name', value.name)
        const value1 = document.getElementById(value.name)
        setoldvalue(value)

        if(oldvalue?.name == value?.name){
            value1.style.color = "black"    
        }else{
            value1.style.color = "blue"
         }

    }
    return (
        <div>
            <h3 className="y-heading my-5">Let us know who you are</h3>

            {contactList && contactList.map((value, index) => {
                return <div className="contacts" key={index}>

                    <IoIosContact size="64" onClick={() => { handleYourself(value) }} className="contact-icon" id={value.name}
                    />
                    <div>
                        <span>{value.name}</span><br />
                        <span style={{ color: "lightgray" }} className="mt-2">hey! i am using whatsapp</span>
                    </div>

                </div>

            })}
            {showcontinue && <Link to="/selectcontact" className="contact-continue">continue</Link>}

        </div>
    )
}

export default Yourself
