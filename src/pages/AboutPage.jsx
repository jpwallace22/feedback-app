import Card from "../components/shared/Card";
import { Link } from "react-router-dom";


function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About This Project</h1>
                <p>This is a simple app made with React to leave feedback for a product or a service.</p>
                <p>Version: 1.0.0</p>

                <Link to="/">
                    Back Home
                </Link>
            </div>
        </Card>
    )
}

export default AboutPage
