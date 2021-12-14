import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosContact } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectcontactlst } from './action/action'
function CreateNew() {
    const [yourconvo, setyourConvo] = useState()
    const [contactList, setcontactList] = useState()
    const [selectedcontactlist, setselectedcontactlist] = useState([])
    const person = useSelector(state => state.user)
    const [showcontinue, setshowcontinue] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://34.122.252.114:3000/contacts')
            .then(res => {
                const data = res.data
                const filterperson = data.filter(value => value.name != person[0]?.name)
                setcontactList(filterperson)

            })
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
    return (
        <>
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
    )
}

export default CreateNew
