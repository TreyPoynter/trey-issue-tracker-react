export default function Footer() {
    const openNewTab = (url) => {
        window.open(url, '_blank');
      };
    return (
        <>
            <footer className="bg-dark text-white p-2 fixed-bottom text-center">
                &copy; <span className="clickable" onClick={() => openNewTab('https://github.com/TreyPoynter')}>
                    Trey Poynter</span> 2023
            </footer>
        </>
    )
}