import api from "../utils/api"
import {useEffect, useState} from "react";

const Teams = () =>{

    const [teams, setTeams] = useState(null)
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        api
            .get("/hello")
            .then((out) => setTeams(out.data))
            .catch((error) =>
                setApiError(error.out ? error.out.data.error : error.message)
            )
    }, [])

    if (apiError) {
        return (
            <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
                {apiError}
            </div>
        )
    }

    if (!teams) {
        return <div>It's calm here...</div>
    }

    if (!teams.length) {
        return (
            <div>
                <p className="text-center text-2xl">It's calm here...</p>
            </div>
        )
    }

    return (
        <div>
            {teams}
        </div>
    )


}

export default Teams