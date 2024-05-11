import NotLoggedIn from "@/components/Auth/NotLoggedIn"
import Login from "@/components/Auth/LoginPage"

export default () => {
    // Ensures that only not logged in users are allowed
    return <NotLoggedIn>
        <Login />
    </NotLoggedIn>
}