import Footer from "./Footer";

function LayoutLogin(props) {
    
    return(
        <>
        <main className="content">{props.children}</main>
        <Footer/>
        </>

    )

}

export default LayoutLogin;