import { useNavigate } from "react-router-dom"


/**
 * 
 * User gets redirected to this page
 * if they try access a page they do not have
 * access too.
 * 
 * @author Scott Mains
 * 
 */

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="text-center pt-20">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized