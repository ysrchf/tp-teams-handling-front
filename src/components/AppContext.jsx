import { createContext } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
    const { pageComponent: Page, router, ...otherProps } = props


    return (
        <AppContext.Provider
            {...otherProps}
        />
    )
}

export default AppContext