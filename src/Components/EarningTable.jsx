
import { useEffect, useState } from 'react'

export const EarningTable = () => {

    const [earnings, setEarnings] = useState([])

    const baseUrl = import.meta.env.VITE_BASE_URL

    let token = ""

    const getEarnings = async () => {

        const endPoint = "earnings"
        const newUlr = `${baseUrl}${endPoint}`

        const response = await fetch(newUlr, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })


        if (response.ok) {
            const result = await response.json()
            setEarnings(result)
        } else {
            console.log("Something went wrong")
        }


    }


    useEffect(() => {

        token = window.localStorage.getItem('movie-credential')
        getEarnings()

    }, [])

    return (
        <>
            <table className='table mt-3'>

                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Movie</th>
                        <th>Revenue</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        earnings.map((item) => (
                            <tr key={item.earningsid}>
                                <td>{item.country}</td>
                                <td>{item.title}</td>
                                <td>{item.revenue}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </>
    )
}
