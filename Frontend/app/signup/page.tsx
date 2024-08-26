import Signup from "../components/Authentication/Signup"
import HomepageLayout from "../components/HomepageLayout/HomepageLayout"

const SignupPage = () => {
    return (
        <HomepageLayout header="Create Your Profile">
            <Signup />
        </HomepageLayout>
    )
}

export default SignupPage
