import { Quote } from "../Components/Quote"
import { Auth } from "../Components/Auth"
export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup"/>
            </div>
            <div className="hidden lg:block">
                < Quote />
            </div>
        </div>
    </div>

}