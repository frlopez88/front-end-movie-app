import { useState } from 'react';


export const LogInForm = () => {


    const [formData, setFormData] = useState({
        password: "", 
        email : ""
    })

    const baseUrl = import.meta.env.VITE_BASE_URL


    const onChangeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        const tmpObject = formData
        tmpObject[property] = value
        setFormData(tmpObject)
    }

    const register=()=>{

        window.location.href="/register"
    }

    const submitHandler = async ()=>{

        event.preventDefault()

        const endPoint = 'auth/logIn'
        const newUrl = `${baseUrl}${endPoint}`


        const response = await fetch(newUrl, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify(formData)
        })

        if(response.ok){
            const result = await response.json()
            const token = result.token
            
            window.localStorage.setItem("movie-credential", token)
            window.location.href="/dashboard"
            
        }else{
            console.log("Invalid Credential")
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
                                <input type="email" name ="email" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div>
                                <label className="form-label mt-4">Password</label>
                                <input type="password" name="password" className="form-control" onChange={onChangeHandler} />
                            </div>

                            <div className='row mt-3'>
                                <div className='col'>
                                    <button className='btn btn-primary w-100'>Log In</button>
                                </div>
                                <div className='col'>
                                    <button  onClick={register} type='button' className='btn btn-primary w-100'>Sign In</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
