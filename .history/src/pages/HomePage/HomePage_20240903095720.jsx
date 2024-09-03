
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectWaterError } from "../../redux/waterConsumption/selectors";

import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import css from "./HomePage.module.css";

const HomePage = () => {
  const { t } = useTranslation();

  const error = useSelector(selectWaterError);

  useEffect(() => {
    if (error?.errorCode === 400) {
      toast.error(`${t("authorization.notification.error")}`);
    } else if (error?.errorCode === 401) {
      toast.error(`${t("authorization.notification.auth")}`);
    } else if (error?.errorCode === 500) {
      toast.error(`${t("authorization.notification.server")}`);
    }
  }, [error, t]);

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
