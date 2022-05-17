import { AiFillGithub } from "react-icons/ai"
import githubLoginStyles from "../../../styles/social-logins/GithubLogin.module.css"

const GithubLogin = () => {
    return (
        <div className={githubLoginStyles.githubBtn}>
            <div>
                <AiFillGithub color="white" size={40} />
                <p className={githubLoginStyles.btnText}><b>Sign in with Github</b></p>
            </div>
        </div>
    )
}

export default GithubLogin