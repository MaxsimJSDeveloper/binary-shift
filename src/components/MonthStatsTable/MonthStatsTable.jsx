import { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import css from "./MonthStatsTable.module.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthWater } from "../../redux/month/operations";
import { selectData, selectIsLoading } from "../../redux/month/selectors";
import Loader from "../Loader/Loader";
import { selectWaterRate } from "../../redux/waterRate/selectors";
import { fetchWaterRate } from "../../redux/waterRate/operations";

const ModalCalendar = ({day,dailyNorma,rate,servings, x, y}) => {
    return (<div className={css.modal} style={{top:y-208, left:x-292}}>
        <div className={css.dayInfo}>
            <p><span className={css.span}>{day}</span></p>
                    <p>Daily norma: <span className={css.span}>{dailyNorma}L</span></p>
                    <p>Fulfillment of the daily norm: <span className={css.span}>{parseInt(rate)}%</span></p>
                    <p>How many servings of water: <span className={css.span}>{servings}</span></p>
                </div>
    </div>)
}

const daysInMonth = (month, year) => {
    return new Date(year, month+1, 0).getDate();
}

export default function MonthStatsTable() {
    const isLoading = useSelector(selectIsLoading);
    const [month, setMonth] = useState(new Date().toLocaleString('en-Us', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setModalOpen] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [day, setDay] = useState(0);
    const [dayObj, setDayObj] = useState({date: '',
            dailyNorm: 1500,
            dailyNormPercent: 0,
            portions: 0})
            
    const water = useSelector(state => selectData(state, { month, year }));
    const dailyNorma = useSelector(selectWaterRate);
    const dispatch = useDispatch();   

    useEffect(() => {
        setMonth(currentDate.toLocaleString("en-Us", { month: 'long' }));
        setYear(currentDate.getFullYear());   
        dispatch(fetchMonthWater({ month, year })); 
        dispatch(fetchWaterRate())
    },[currentDate, dispatch, month, year],)

    // Створення масиву обєктів для календаря
    const daysArray = Array.from({ length: daysInMonth(currentDate.getMonth(), year) }, (_, i) => {
        return {  
            date: `${i+1}, ${month}`,
            dailyNorm: dailyNorma,
            dailyNormPercent: 0,
            portions: 0
        }
    })
    //Додавання данних у масив з масиву який прийшов з бекенду
    const newDaysArray = daysArray.map(obj1 => {
        const matchingObj = water.find(obj2 => obj2.date === obj1.date);
        return matchingObj ? matchingObj : obj1;
    })

    // Дії які відбуваються при кліку по кнопках вперед-назад
    const handleLeftButton = () => { 
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);         
            return newDate;
        });  
    }
    const handleRightButton = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate)
            newDate.setMonth(prevDate.getMonth() + 1)          
            return newDate
        });        
    }

    // Дії які відбуваються в заледності від місцезнаходження мищі
    const handleMouseEnter = (e, day) => {
        setModalOpen(true) 
        setX(e.clientX);
        setY(e.clientY);
        setDay(day);
        setDayObj(newDaysArray.find(obj => obj.date === day))        
    }

    const handleMouseLeave = () => {
        setModalOpen(false)      
    }    
    
    // Розположення <div> в залежності від девайсу
    const isMobile = useMediaQuery({ query: '(max-width:767px)' });
    const isTablet = useMediaQuery({ query: '(min-width:768px) and (max-width:1440px' });
    const isDesktop = useMediaQuery({ query: '(min-width:1440px)' });

    return (
        <div className={css.calendar}>
           <div className={css.navigation}>
                <h3>Month</h3>
                <div className={css.navigationBar}>
                    <button className={css.button} onClick={handleLeftButton}><HiOutlineChevronLeft size={14} /></button>
                    <p>{month}, {year}</p>
                    {currentDate.getMonth() >= new Date().getMonth() &&
                        currentDate.getFullYear() >= new Date().getFullYear() ?
                        (<button className={css.disable}><HiOutlineChevronRight size={14} /></button>)
                        : (<button className={css.button} onClick={handleRightButton}><HiOutlineChevronRight size={14} /></button>)}
                </div>                
            </div>
            {isLoading&&<Loader/>}
            <ul className={css.ul}>
                {newDaysArray.map((day) => (<li className={css.li} key={parseInt(day.date)} onMouseEnter={(e)=>handleMouseEnter(e,day.date)} onMouseLeave={handleMouseLeave}>
                    {parseInt(day.dailyNormPercent) < 100 ?
                        <div className={css.liDate}>{parseInt(day.date)}</div> :
                        <div className={css.liDateFull}>{parseInt(day.date)}</div>}
                    <p className={css.p}>{parseInt(day.dailyNormPercent)}%</p>                    
                </li>))}
            </ul>
            {isModalOpen && isMobile &&
                <ModalCalendar day={day} dailyNorma={dayObj.dailyNorm} rate={dayObj.dailyNormPercent} servings={dayObj.portions} y={y} />}
            {isModalOpen && isTablet && x <= 400 &&
                <ModalCalendar day={day} dailyNorma={dayObj.dailyNorm} rate={dayObj.dailyNormPercent} servings={dayObj.portions} x={x+ 280} y={y} />}
            {isModalOpen && isTablet && x > 400 &&
                <ModalCalendar day={day} dailyNorma={dayObj.dailyNorm} rate={dayObj.dailyNormPercent} servings={dayObj.portions} x={x} y={y} />}
            {isModalOpen && isDesktop &&
                <ModalCalendar day={day} dailyNorma={dayObj.dailyNorm} rate={dayObj.dailyNormPercent} servings={dayObj.portions} x={x} y={y} />}
        </div>
    )
}