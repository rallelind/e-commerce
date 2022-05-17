import googleLoginStyles from "../../../styles/social-logins/GoogleLogin.module.css"

const GoogleLogin = () => {
    return (
        <div className={googleLoginStyles.googleBtn}>
            <div className={googleLoginStyles.googleIconWrapper}>
                <img className={googleLoginStyles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className={googleLoginStyles.btnText}><b>Sign in with Google</b></p>
        </div>
    )
}

export default GoogleLogin