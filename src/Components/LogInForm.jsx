import { useState } from 'react';


export const LogInForm = () => {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const baseUrl = import.meta.env.VITE_BASE_URL


    const changeHandlerEmail = (event)=>{
        setEmail(event.target.value)
    }

    const changeHandlerPassword = (event)=>{
        setPassword(event.target.value)
    }

    const register=()=>{

        window.location.href="/register"
    }

    const submitHandler = async ()=>{

        event.preventDefault()

        const endPoint = 'auth/logIn'
        const newUrl = `${baseUrl}${endPoint}`

        const data = {
            password, 
            email
        }

        const response = await fetch(newUrl, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify(data)
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
                                <input type="email" className="form-control" onChange={changeHandlerEmail} />
                            </div>

                            <div>
                                <label className="form-label mt-4">Password</label>
                                <input type="password" className="form-control" onChange={changeHandlerPassword} />
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
