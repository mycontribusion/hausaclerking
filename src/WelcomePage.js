
import logo from './hclogo.jpg';
import './WelcomePage.css';

function WelcomePage({openApp}) {
    return(
        <div onClick={() => openApp()}>
            <p className='header'>Hausa Clerking</p>
            <div className='logo'><img src={logo} alt="" style={{width: '20em', height: '20em'}}/></div>
            <div className='foot'><p id='foot'>tap anywhere</p></div>
        </div>
    )
}

export default WelcomePage;