const Footer = () => {
    return (
        <footer className="bg-black flex flex-col bottom-0 w-full justify-center items-center py-4 px-4">
            <div className="logo flex items-center justify-center">
                <span className="text-green-500 lol text-3xl">&lt;</span>
                <p className="lol text-3xl text-white">Pass</p>
                <span className="text-green-500 lol text-3xl">OP/&gt;</span>
            </div>
            <div className="flex flex-wrap justify-center items-center text-white gap-1 mt-1">
                <p className="footer-text text-md xl:text-2xl">Created with</p>
                <img src="./assets/Heart.svg" alt="Heart" width={30} className="v translate-y-2"/>
                <p className="footer-text text-md xl:text-2xl">by Vaasu Gagneja</p>
            </div>
        </footer>
    )
}

export default Footer