import { useQuery, useMutation } from "@apollo/client";
import CreateWorkout from "./createworkout";


function Home() {
    
    return (
        <div className="home-container">
            <h1 className="whatisbell">What is BellWork?</h1>
            <div className="homeex">
                Bell Work is a one of a kind workout program builder.
            </div>
            <div className="learnmore">Learn More</div>
            <a href="createworkout" className="startbuild">Create A Workout</a>
            <div className="orange-line"></div>
            <div className="homefill"></div>
            <img className="thorhome" src="/thornew.jpg" alt="" />
            
                <div id="bottomhome" className="homelowermain">

                   
                </div>

           
        </div>
    )
}

export default Home;

