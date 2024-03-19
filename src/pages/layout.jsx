const Layout = ({children}) => {
    return (
        <>
        <div data-tauri-drag-region className="titlebar"></div>
        <div className="mt-8 bg-base-100">
        {children}
        </div>
        </>
    )
}

export default Layout