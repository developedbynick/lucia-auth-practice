import SignUp from "@/components/Auth/SignUpPage";
import NotLoggedIn from '@/components/Auth/NotLoggedIn';

export default () => {
    return <NotLoggedIn>
        <SignUp />
    </NotLoggedIn>
}