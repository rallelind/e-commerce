import { MdKeyboardArrowLeft } from "react-icons/md"
import stylesGoBackBtn from "../../styles/GoBackBtn.module.css"
import { useRouter } from "next/router"

const GoBackBtn = () => {

    const router = useRouter()
    
    return (
        <div 
            className={stylesGoBackBtn.GoBackBtnContainer}
            onClick={() => router.back()}
        >
            <div className={stylesGoBackBtn.iconContainer}>
                <MdKeyboardArrowLeft size={40}/>
            </div>
        </div>
    )
}

export default GoBackBtn