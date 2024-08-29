// import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Modal from "../Modal/Modal";



const TodayListModal = ({ onClose, isOpen }) => {
    // const [amount, setAmount] = useState();
    const handleClose = () => {
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <h2>Add water</h2>
            <h3>Choose a value:</h3>
            <p>Amount of water:</p>
                <div>
                    <button>
                        <FiMinus />
                    </button>
                    <div>
                        <p>50ml</p>
                    </div>
                    <button>
                        <FiPlus />
                    </button>
            </div>
            <div>
                <p>Recording time:</p>
                <input
                    type="text"
                />
            </div>
            <div>
                <h3>Enter the value of the water used:</h3>
                <input
                    type="number"
                />
            </div>
            <div>
                <p>50ml</p>
                <button>Save</button>
            </div>
            
            
            
    </Modal>
)
};

export default TodayListModal;