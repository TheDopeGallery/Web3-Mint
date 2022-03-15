import ConnectMetamask from "../utils/metamask";

function Navbar({ active, account, connectMetamask, deactivateMetamask }) {
    return (
        <nav className="navbar navbar-transparent py-2 navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://cryptodemonz.com/">
                    <img
                        src="/images/dglabs.jpg"
                        alt="CryptoDopePandas logo"
                        className="navbar-logo"
                        height="50px"
                        width="125px"
                    />
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse me-auto text-center"
                    id="navbarColor02"
                >
                    <ul className="navbar-nav navbar-right ms-auto">
                        <li className="nav-item mr-5">
                            <a
                                className="nav-link"
                                href="https://cryptodemonz.com/"
                            >
                                HOME
                            </a>
                        </li>
                        <li className="nav-item">
                            <ConnectMetamask
                                active={active}
                                account={account}
                                connectMetamask={connectMetamask}
                                deactivateMetamask={deactivateMetamask}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
