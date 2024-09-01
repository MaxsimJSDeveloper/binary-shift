import { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import css from "./MonthStatsTable.module.css"

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

export default function MonthStatsTable() {
    const [month, setMonth] = useState(new Date().toLocaleString('en-Us', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setMonth(currentDate.toLocaleString("en-Us", { month: 'long' }));
        setYear(currentDate.getFullYear());        
    })


    const handleLeftButton = () => { 
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate)
            newDate.setMonth(prevDate.getMonth() - 1)
            return newDate
        });  
    }
    const handleRightButton = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate)
            newDate.setMonth(prevDate.getMonth() + 1)
            return newDate
        });
    }

    const daysArray = Array.from({length: daysInMonth(currentDate.getMonth(), year)},(_,i)=>i+1)

    return (
        <div className={css.calendar}>
           <div className={css.navigation}>
                <h3>Month</h3>
                <div className={css.navigationBar}>
                    <button className={css.button} onClick={handleLeftButton}><HiOutlineChevronLeft/></button>
                    <p>{month}, {year}</p>
                    {currentDate.getMonth() >= new Date().getMonth() ? (<button className={css.disable}><HiOutlineChevronRight/></button>):(<button className={css.button} onClick={handleRightButton}><HiOutlineChevronRight /></button>)}
                </div>
           </div>
            <ul className={css.ul}>
                {daysArray.map(day => (<li className={css.li} key={day}>{day}</li>))}
           </ul>
        </div>
    )
}