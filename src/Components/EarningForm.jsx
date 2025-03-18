import { useState, useEffect } from "react"

export const EarningForm = () => {

    const [formData, setFormData] = useState({
        movieId: "",
        country: "",
        revenue: ""
    })

    const [notification, setNotification] = useState("")
    const [movies, setMovies] = useState([])

    const baseUrl = import.meta.env.VITE_BASE_URL

    const onChangeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        const tmpObject = formData
        tmpObject[property] = value
        setFormData(tmpObject)
    }

    const submitHandler = async (event) => {

        const token = window.localStorage.getItem("movie-credential")

        event.preventDefault()

        const endPoint = 'earnings'
        const newUrl = `${baseUrl}${endPoint}`

        console.log(newUrl)
        console.log(formData)

        const response = await fetch(newUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            setNotification("Earning Created")

            setTimeout(() => {
                window.location.href = "/earnings"
            }, 2000)

        } else {
            const errMessage = await response.json()
            console.log(errMessage)
            setNotification(errMessage.error)
        }

    }

    const getMovies = async () => {

        const token = window.localStorage.getItem("movie-credential")
        const endPoint = 'movies'
        const newUrl = `${baseUrl}${endPoint}`



        const response = await fetch(newUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        if (response.ok) {
            const data = await response.json()
            setMovies(data)
        } else {
            setNotification("Error on fetching Movies")
        }
    }


    useEffect(() => {
        getMovies()
    }, [])

    return (
        <>
            <p className='display-2 text-center'>Earnings Form</p>

            <div className="card bg-light mb-3 mx-5" >
                <div className="card-header">Log In</div>
                <div className="card-body">

                    <form  onSubmit={submitHandler}>

                        <div>
                            <label className="form-label mt-4">Select Movie</label>
                            <select onChange={onChangeHandler} className="form-select" name="movieId">
                                <option key={0} value={0} > {"Select Movie"} </option>
                                {movies.map((item) => (
                                    <option key={item.movieid} value={item.movieid} > {item.title} </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="form-label mt-4">Country</label>
                            <input type="text" name="country" className="form-control" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label className="form-label mt-4">Revenue</label>
                            <input type="number" name="revenue" className="form-control" onChange={onChangeHandler} />
                        </div>


                        <button className='btn btn-primary w-100 mt-3'>Create</button>
                    </form>

                    <p className="mt-3">{notification}</p>
                </div>
            </div>

        </>
    )
}
