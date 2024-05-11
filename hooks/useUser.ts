import { SessionContext } from "@/components/Auth/SessionProvider"
import { useContext } from "react"

export default () => {
    const data = useContext(SessionContext)!;
    return data;
}