
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import DailyNorma from "../../components/DailyNorma/DailyNorma";


const HomePage = () => {
  return (
    <section className={}>
      <div className={}>
        <div className={}>
          <div className={}>
            <DailyNorma />
            <WaterRatioPanel />
          </div>

          <div className={}>
            <div className={}>
              <TodayWaterList />
              <MonthStatsTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
