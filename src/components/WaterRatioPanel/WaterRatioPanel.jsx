import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { selectPercentageConsumed } from "../../redux/today/selectors";
import css from './WaterRatioPanel.module.css'

import TodayListModal from "../TodayListModal/TodayListModal";
import Modal from "../Modal/Modal";
import { getWaterToday } from "../../redux/today/operations";


const WaterRatioPanel = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const todayWaterPercentage = useSelector(selectPercentageConsumed);
    const [waterConsumedValue, setWaterConsumedValue] = useState(0);
    // const todayWaterPercentage = 50;
    useEffect(() => {
        dispatch(getWaterToday());
      }, [dispatch]);
      
    //   console.log("Today's Water Percentage:", todayWaterPercentage);

    useEffect(() => {
        if (todayWaterPercentage) {
            const value = Number(parseInt(todayWaterPercentage));
            setWaterConsumedValue(value > 100 ? 100 : value);
        } else {
            setWaterConsumedValue(0);
        }
    }, [todayWaterPercentage]);

    useEffect(() => {
        const rangeSlider = document.getElementById("range-slider");
        const rangeInput = document.getElementById("range-input");
        const rangeValue = document.getElementById("range-value");
        
        const updateThumbPosition = () => {
            if (rangeInput && rangeValue && rangeSlider) {
                const progressRatio = waterConsumedValue / 100;
                const availableWidth = rangeInput.offsetWidth - rangeSlider.offsetWidth;
                const positionX = progressRatio * availableWidth;

                rangeSlider.style.left = `${positionX}px`;
                rangeValue.style.left = `${positionX}px`;
                rangeValue.innerText = `${waterConsumedValue}%`;
            }
        };
        

        const updateRangeBackground = () => {
            if (rangeInput) {
                const progressRatio = waterConsumedValue / 100;
                let space;
                if (window.innerWidth <= 320) {
                    space = rangeInput.offsetWidth - 4;  
                } else if (window.innerWidth <= 768) {
                    space = rangeInput.offsetWidth - 5; 
                } else {
                    space = rangeInput.offsetWidth - 6;  
                }
                const positionX = progressRatio * space;
                rangeInput.style.background = `linear-gradient(to right, var(--color-6) 0%, var(--color-6) ${positionX}px, var(--color-8) ${positionX}px, var(--color-8) 100%)`;

                rangeSlider.style.left = `${positionX}px`;
                rangeValue.style.left = `${positionX}px`;

                const lowPercentageLabel = document.getElementById("low-percentage");
                const highPercentageLabel = document.getElementById("high-percentage");
                
                if (waterConsumedValue <= 8) {
                    lowPercentageLabel.style.opacity = '0'; 
                } else {
                    lowPercentageLabel.style.opacity = '1'; 
                }
                
                if (waterConsumedValue >= 89) {
                    highPercentageLabel.style.opacity = '0'; 
                } else {
                    highPercentageLabel.style.opacity = '1'; 
                }
            }
        };

        updateRangeBackground();
        updateThumbPosition();
        window.addEventListener('resize', updateRangeBackground);
        return () => {
            window.removeEventListener('resize', updateRangeBackground);
        };
    }, [waterConsumedValue]);

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <p className={css.rangeHeader}>Today</p>
                <div className={css.progressbar}>
                    <div className={css.rangeContainer}>
                        <div className={css.rangeIntake}>
                            <div className={css.rangeWaterValue} id="range-value">
                                <span className={css.rangeNumber}>{waterConsumedValue}%</span>
                            </div>
                            <div className={css.inputWrapper}>
                                <input
                                    type="range"
                                    id="range-input"
                                    min="0"
                                    max="100"
                                    value={waterConsumedValue}
                                    step="1"
                                    readOnly
                                    className={css.rangeInput}
                                />
                            </div>
                            <div className={css.rangeSlider} id="range-slider"></div>
                        </div>
                    </div>
                    <div className={css.rangePerc}>
                        <span className={css.lowPercentage} id="low-percentage">0%</span>
                        <span className={css.highPercentage} id="high-percentage">100%</span>
                    </div>
                </div>
            </div>
            <button className={css.addWaterBtn} onClick={() => setIsModalOpen(true)}>
                <CiCirclePlus className={css.addIcon} />
                Add Water
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                <TodayListModal
                    onClose={() => setIsModalOpen(false)}
                    isOpen={isModalOpen}
                />
            </Modal>
        </div>
    );
};

export default WaterRatioPanel;
