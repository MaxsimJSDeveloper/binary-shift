
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectWaterError } from "../../redux/waterConsumption/selectors";
import { IError } from "../../services/handleApiError";

import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import css from "./HomePage.module.css";

const HomePage = () => {
  const error = useSelector(selectWaterError);

  useEffect(() => {
    if (error?.errorCode === 400) {
      toast.error("Authorization error: Bad request");
    } else if (error?.errorCode === 401) {
      toast.error("Authorization error: Unauthorized");
    } else if (error?.errorCode === 500) {
      toast.error("Server error: Internal server error");
    }
  }, [error]);

  return (
    <section className={css.section}>
      <div className={css.background}>
        <div className={css.container}>
          <div className={css.firstSection}>
            <DailyNorma />
            <WaterRatioPanel />
          </div>

          <div className={css.containerProgressWrapper}>
            <div className={css["container-progress"]}>
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
