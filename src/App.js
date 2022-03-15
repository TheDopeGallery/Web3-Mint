import Navbar from "./layout/Navbar";
import TabbedContent from "./modules/TabbedContent";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./utils/connectors.js";

function App() {
    const { active, account, activate, deactivate } =
        useWeb3React();

    const connectMetamask = async () => {
        await activate(injected);
    };

    const deactivateMetamask = async () => {
        await deactivate(injected);
    };

    return (
        <div>
            <Navbar
                active={active}
                account={account}
                connectMetamask={connectMetamask}
                deactivateMetamask={deactivateMetamask}
            />
            <div className="container container-body">
                <TabbedContent account={account} active={active} />
            </div>
        </div>
    );
}

export default App;
