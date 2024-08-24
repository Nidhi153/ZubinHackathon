'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import CreateEvent from "../components/Dashboard/CreateEvent"

const CreateEventPage = () => {
    const [userId, setUserId] = useState<string>("")

    useEffect(() => {
        const userId = Cookies.get("userId");
        console.log("userid", userId);
        setUserId(userId!);
      }, [])

    return (
        <CreateEvent userId={userId}></CreateEvent>
    )
}

export default CreateEventPage
