import { useState } from "react"


export const RegisterForm = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        lastName: ""
    })

    const [notification, setNotification] = useState("")

    const baseUrl = import.meta.env.VITE_BASE_URL

    const onChangeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        const tmpObject = formData
        tmpObject[property] = value
        setFormData(tmpObject)
    }

    const submitHandler = async (event) => {

        event.preventDefault()

        const endPoint = 'auth/register'
        const newUrl = `${baseUrl}${endPoint}`

        const response = await fetch(newUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            setNotification("User was created")

            setTimeout(() => {
                window.location.href = "/"
            }, 5000)

        } else {

            const errMessage = await response.json()
            setNotification(errMessage.error)
        }

    }

    return (
        <>
            <div className='parent'>
                <div className="card bg-light mb-3" style={{ maxWidth: "400px" }}>
                    <div className="card-header">Log In</div>
                    <div className="card-body">

                        <form onSubmit={submitHandler}>

                            <div>
                                <label className="form-label mt-4">Email</label>
                                <input type="email" name="email" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div>
                                <label className="form-label mt-4">Password</label>
                                <input type="password" name="password" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div>
                                <label className="form-label mt-4">Name</label>
                                <input type="text" name="name" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div>
                                <label className="form-label mt-4">Last Name</label>
                                <input type="text" name="lastName" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div className='row mt-3'>
                                <div className='col'>
                                    <button className='btn btn-primary w-100'>Create</button>
                                </div>
                                <div className='col'>
                                    <button type="button" className='btn btn-primary w-100'>Log In</button>
                                </div>
                            </div>
                        </form>

                        <p className="mt-3">{notification}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
