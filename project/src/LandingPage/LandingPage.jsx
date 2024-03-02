import joystick from "./Images/joystick.png"
import ninten from "./Images/nintendo.png"
import xbox from "./Images/xbox.png"
import mac from "./Images/macbook.png"
import star from "./../LandingPage/star"
export const LandingPage=()=>{

 
    return(
        <div class="main-box">
            <main className="main-box-intro">
                <star height={"3px"} top="10px" left="10px" delay="1s" ></star>
                <section>
                    <h1>Welcome to Jetronics</h1>
                    <h3>Your tech buddy</h3>
                </section>
            </main>
            <aside className="main-box-aside">
            <img src={joystick} className="floating-icon float1" alt="floating"></img>
            <img src={ninten} className="floating-icon float2" alt="floating"></img>
            <img src={xbox} className="floating-icon float1" alt="floating"></img>
            <img src={mac} className="floating-icon float2" alt="floating"></img>
            </aside>

            {/* <aside className="main-box-aside">
                aside
            </aside>
            <div className="tech-wheel">
                Wheel
            </div> */}

        </div>
    )
}