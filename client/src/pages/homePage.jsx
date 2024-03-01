import { useQuery, useMutation } from "@apollo/client";


function Home() {
    
    return (
        <div className="home-container">
            <h1 className="whatisbell">What is BellWork?</h1>
            <div className="homeex">
                Bell Work is a one of a kind workout program builder.
            </div>
            <div className="learnmore">Learn More</div>
            <a href="#bottomhome" className="startbuild">Build a Program for Free</a>
            <div className="orange-line"></div>
            <div className="homefill"></div>
            <img className="thorhome" src="/thornew.jpg" alt="" />
            
                <div id="bottomhome" className="homelowermain">

                    <div className="box-container">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>

           
        </div>
    )
}

export default Home;

