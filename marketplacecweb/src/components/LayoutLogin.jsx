import Footer from "./Footer";

function LayoutLogin(props) {
    
    return(
        <>
        <main class="content">{props.children}</main>
        <Footer/>
        </>

    )

}

export default LayoutLogin;