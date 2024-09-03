import { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import css from "./MonthStatsTable.module.css"

const ModalCalendar = ({day,month,dailyNorma,rate,servings, x, y}) => {
    return (<div className={css.modal} style={{top:y-205, left:x}}>
        <div className={css.dayInfo}>
            <p><span className={css.span}>{day}, {month}</span></p>
                    <p>Daily norma: <span className={css.span}>{dailyNorma}L</span></p>
                    <p>Fulfillment of the daily norm: <span className={css.span}>{rate}%</span></p>
                    <p>How many servings of water: <span className={css.span}>{servings}</span></p>
                </div>
    </div>)
}

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

export default function MonthStatsTable() {
    const [month, setMonth] = useState(new Date().toLocaleString('en-Us', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setModalOpen] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [day, setDay] = useState(0);


    useEffect(() => {
        setMonth(currentDate.toLocaleString("en-Us", { month: 'long' }));
        setYear(currentDate.getFullYear());             
    },[currentDate])


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
    const handleMouseEnter = (e, day) => {
        setModalOpen(true) 
        setX(e.clientX);
        setY(e.clientY);
        setDay(day);        
    }

    const handleMouseLeave = () => {
        setModalOpen(false)      
    }

    const daysArray = Array.from({ length: daysInMonth(currentDate.getMonth(), year) }, (_, i) => i + 1)
    
    const isMobile = useMediaQuery({ query: '(max-width:767px)' });
    const isTablet = useMediaQuery({ query: '(min-width:768px) and (max-width:1440px' });
    const isDesktop = useMediaQuery({ query: '(min-width:1440px)' });

    const rate = 0;
    const dailyNorma = 1.5;
    const servings = 0;
    


    return (
        <div className={css.calendar}>
           <div className={css.navigation}>
                <h3>Month</h3>
                <div className={css.navigationBar}>
                    <button className={css.button} onClick={handleLeftButton}><HiOutlineChevronLeft size={14}/></button>
                    <p>{month}, {year}</p>
                    {currentDate.getMonth() >= new Date().getMonth() ? (<button className={css.disable}><HiOutlineChevronRight size={14}/></button>):(<button className={css.button} onClick={handleRightButton}><HiOutlineChevronRight /></button>)}
                </div>                
           </div>
            <ul className={css.ul}>
                {daysArray.map((day) => (<li className={css.li} key={day}  onMouseEnter={(e)=>handleMouseEnter(e,day)} onMouseLeave={handleMouseLeave}>
                    {rate<100?<div className={css.liDate}>{day}</div>:<div className={css.liDateFull}>{day}</div>}
                    <p className={css.p}>{rate}%</p>                    
                </li>))}
            </ul>
            {isModalOpen && isMobile && <ModalCalendar day={day} month={month} dailyNorma={dailyNorma} rate={rate} servings={servings} y={y} />}
            {isModalOpen && isTablet && x<=400 && <ModalCalendar day={day} month={month} dailyNorma={dailyNorma} rate={rate} servings={servings} x={x} y={y}/>}
            {isModalOpen && isTablet && x>400 && <ModalCalendar day={day} month={month} dailyNorma={dailyNorma} rate={rate} servings={servings} x={x-280} y={y}/>}
            {isModalOpen && isDesktop && <ModalCalendar day={day} month={month} dailyNorma={dailyNorma} rate={rate} servings={servings} x={x-280} y={y}/>}
        </div>
    )
}