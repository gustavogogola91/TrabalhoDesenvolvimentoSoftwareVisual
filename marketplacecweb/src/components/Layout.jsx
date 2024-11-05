import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
    
    return(
        <>
        <Header/>
        <main className="content">{props.children}</main>
        <Footer/>
        </>

    )

}

export default Layout;