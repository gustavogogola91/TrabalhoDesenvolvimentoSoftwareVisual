import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
    
    return(
        <>
        <Header/>
        <main class="content">{props.children}</main>
        <Footer/>
        </>

    )

}

export default Layout;