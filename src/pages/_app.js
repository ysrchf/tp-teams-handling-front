import { AppContextProvider} from "../components/AppContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps, ...otherProps }) {
    return (
        <AppContextProvider pageComponent={Component} router={otherProps.router}>
            <Component {...pageProps} {...otherProps} />
        </AppContextProvider>
    )
}

export default MyApp