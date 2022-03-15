import MintForm from "./MintForm";
import PresaleForm from "./PresaleForm";
import GuideForm from "./GuideForm";

function TabbedContent({ account, active }) {
    return (
        <div className="row align-items-center h-100">
            <div className="col"></div>
            <div className="card mt-5">
                <div className="card-body">
                    <ul className="nav nav-tabs tabbed-navbar-custom">
                        <li className="nav-item">
                            <a
                                className="nav-link tabbed-link-custom active"
                                data-bs-toggle="tab"
                                href="#home"
                            >
                                Mint
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link tabbed-link-custom"
                                data-bs-toggle="tab"
                                href="#profile"
                            >
                                Presale
                            </a>
                        </li>
                    </ul>

                    <div id="myTabContent" className="tab-content">
                        <div
                            className="tab-pane fade show active h-40"
                            id="home"
                        >
                            <MintForm account={account} active={active} />
                        </div>
                        <div className="tab-pane fade" id="profile">
                            <PresaleForm account={account} active={active} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabbedContent;
