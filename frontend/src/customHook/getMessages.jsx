
import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetMessages = () => {

    let dispatch = useDispatch()
    let { userData , selectedUser } = useSelector(state => state.user)

    useEffect(() => {
        if(!selectedUser?._id ) return;
        const fetchMessage = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, { withCredentials: true })
                console.log(result.data);
                
                dispatch(setMessages(result.data)) 
            }
            catch (error) {
                console.log(error.response);
            }
        }
        fetchMessage()

    }, [selectedUser?._id ,userData])
}

export default useGetMessages