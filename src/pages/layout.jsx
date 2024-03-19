const Layout = ({children}) => {
    return (
        <>
        <div data-tauri-drag-region className="titlebar"></div>
        {children}
        </>
    )
}

export default Layout