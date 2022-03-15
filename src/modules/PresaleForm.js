import { useState } from "react";
//import Web3 from "web3";
// import DopePandasABI from "../abis/DopePandas";

const PresaleForm = ({ account, active }) => {
    //const web3 = new Web3(window.ethereum);
    // const contract = new web3.eth.Contract(
    //     DopePandasABI,
    //     "0xAE16529eD90FAfc927D774Ea7bE1b95D826664E3"
    // );
    const [amount, setAmount] = useState(1);
    const [click, setClick] = useState(false);

    // const buyToken = async () => {
    //     if (active) {
    //         try {
    //             await contract.methods.preMint(amount).send({ from: account });
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     } else {
    //         alert("please connect to metamask");
    //     }
    // };

    const checkValue = () => {
        if (amount <= 0) {
            setAmount(1);
        } else if (amount > 20) {
            setAmount(20);
        }
    };

    const handleBuyOrder = () => {
        setClick(true);
    };

    return (
        <div className="row">
            <div className="col-lg-12 form-tabbed">
                <div className="form-group text-center">
                    {click ? (
                        <div className="alert alert-danger" role="alert">
                            Presale is disabled
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <label htmlFor="exampleInputEmail1">
                        <img
                            src="/images/777-1.png"
                            className="welcome-gif"
                            alt="Welcome to the minting section"
                        />
                        <h1>
                            <u>Presale</u>
                        </h1>
                        <p>Pay your gas fee & claim your presale Dope Panda!</p>
                        <div className="input-group mb-3">
                            {checkValue()}
                            <input
                                type="number"
                                className="form-control number-custom"
                                id="exampleInputEmail1"
                                min="1"
                                max="20"
                                placeholder=""
                                value={amount}
                                onChange={(event) => {
                                    setAmount(event.target.value);
                                }}
                            />

                            <span className="input-group-text">NFT</span>
                        </div>

                    </label>
                    <br />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleBuyOrder}
                    >
                        Claim!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PresaleForm;
