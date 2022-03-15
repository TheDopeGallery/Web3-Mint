import { getQueriesForElement } from "@testing-library/react";
import { useState } from "react";
import Web3 from "web3";
import DopePandasABI from "../abis/DopePandas";
import DopePandasTesting from "../abis/DopePandasTesting.json";

const MintForm = ({ account, active }) => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
        //DopePandasABI,
        //"",
        DopePandasTesting,
        "0x72549CF06F54fCe47322e69d854105535f3f3a43" //testing
    );
    const [ethPrice, setEthPrice] = useState(1);
    const [amount, setAmount] = useState(1);
    const [popupData, setPopupData] = useState([false]);
    const [mintEnabled, setMintEnabled] = useState(true);
    //const [gasPrice, setGasPrice] = useState('');

    const buyToken = async () => {
        checkTotalSupply();

        if (mintEnabled) {
            if (active) {
                try {
                    setPopupData(["gas"]);

                    contract.methods.mintToken(amount).send({
                        from: account,
                        value: amount * web3.utils.toWei("0.0777", "ether"),
                        gasLimit: amount * "300000",
                        maxPriorityFeePerGas: null,
                        maxFeePerGas: null,
                    });


                } catch (err) {
                    console.log(err);
                    //TODO dont throw error alert if user just rejects transaction
                    setPopupData(["error", err]);
                }
            } else {
                setPopupData(["metamask"]);
            }

        }

    };

    const checkTotalSupply = () => {
        contract.methods.totalSupply().call()
        .then(res => {
            if (res === 10000) {
                setMintEnabled(false);
                setPopupData(["mintComplete"]);
                console.log(res)
            }
        });
    }

    //this has a visual bug, user can put as many zeros as he wants before first non-zero int
    //TODO find better solution
    //note, if setEthPrice(0) is not a good solution
    const checkValue = () => {
        if (ethPrice > 20) {
            setEthPrice(20);
        }
    };


    const hidePopup = () => {
        setPopupData([false]);
    };

    const errorController = () => {
        if (popupData[0] === false) {
            return;
        } else if (popupData[0] === "mintComplete") {
            return (
                <div className="modal-container">
                    <div className="alert alert-dismissible alert-success">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={hidePopup}
                        ></button>
                        <strong>Thats all!</strong>
                        <p className="text-dark">
                           Wow it looks like every single The Dope Pandas v1 has been minted! <br />
                           We want to thank each and every one of you for the support you have provided our project! <br />
                           Gear up for the The Dope Pandas v2 3d!
                        </p>
                    </div>
                </div>
            );
        } else if (popupData[0] === "error") {
            return (
                <div className="modal-container">
                    <div className="alert alert-dismissible alert-danger">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={hidePopup}
                        ></button>
                        <strong>Oh snap!</strong>
                        <p className="text-dark">
                            It looks like an Error occured, please copy the text
                            below and send a PM to the CDZ Report bot
                        </p>
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="3"
                        >
                            {popupData[1]}
                        </textarea>
                    </div>
                </div>
            );
        } else if (popupData[0] === "gas") {
            return (
                <div className="modal-container">
                    <div className="alert alert-dismissible alert-warning">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={hidePopup}
                        ></button>
                        <strong>Warning!</strong>
                        <p className="text-dark">
                            Gas fee problem is partially resolved, it will give
                            you reasonable price which is under 100$. But
                            consider that it's statically adjuted (current
                            default is 300000 limit). We are working to develop
                            gas management strategy and offer the better prices in the future.
                            Until then you can monitor the gas prices here
                            https://etherscan.io/gastracker
                        </p>
                    </div>
                </div>
            );
        } else if (popupData[0] === "metamask") {
            return (
                <div className="modal-container">
                    <div className="alert alert-dismissible alert-warning">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={hidePopup}
                        ></button>
                        <strong>Warning!</strong>
                        <p className="text-dark">
                            Please connect metamask with the button in the top
                            right corner
                        </p>
                    </div>
                </div>
            );
        } else {
            return <p></p>;
        }
    };

    return (
        <div>
            {errorController()}
            <div className="row">
                <div className="col-lg-12 form-tabbed">
                    <div className="form-group text-center">
                        <label htmlFor="exampleInputEmail1">
                            <img
                                src="/images/777.png"
                                className="welcome-gif"
                                alt="Welcome to the minting section"
                            />

                            <h1>
                                <u>Minting</u>
                            </h1>
                        </label>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <div className="input-group mb-3">
                                    {checkValue()}
                                    <input
                                        type="number"
                                        className="form-control number-custom"
                                        id="exampleInputEmail1"
                                        min="1"
                                        max="20"
                                        placeholder=""
                                        value={ethPrice}
                                        onChange={(event) => {
                                            setEthPrice(event.target.value);
                                            setAmount(event.target.value);
                                        }}
                                    />
                                    <span className="input-group-text">
                                        NFT
                                    </span>
                                </div>
                            </div>

                            <div className="col-sm-2 text-center">
                                <h1 className="equals">=</h1>
                            </div>

                            <div className="col-md-5 text-center">
                                <div className="input-group mb-3">
                                    <input
                                        type="number"
                                        className="form-control eth-custom"
                                        id="exampleInputEmail1"
                                        min="1"
                                        max="20"
                                        placeholder=""
                                        disabled
                                        value={ethPrice * 0.0777}
                                    />
                                    <span className="input-group-text">
                                        ETH
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p>
                            <small>(Maximum of 20)</small> <br />
                        </p>
                        <br />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={buyToken}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MintForm;
