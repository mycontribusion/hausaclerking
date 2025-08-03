import Buttons from "./Buttons";
import logo from './hclogo.jpg';


function HausaClerking() {
    return(
        <div>
            <div><img src={logo} alt="" width='70px' height='70px'/></div>
            <div>
                <Buttons/>
                </div>
        </div>
    )
}

export default HausaClerking;