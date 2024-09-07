import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getStatistics } from "../../../BLL/superAdmin/statisticsSlice";

dayjs.locale("ru");

export default function Statistics() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const statistics = useSelector(
    (state) => state.superAdminStatistics?.statistics
  );
  const [date, setDate] = useState(dayjs());
  const [maxSum, setMaxSum] = useState(0); // Добавляем состояние для хранения максимального значения SUM

  useEffect(() => {
    dispatch(getStatistics({ accountId: accountId }));
  }, [accountId]);

  const [statisticsFilter, setStatisticsFilter] = useState([]);

  useEffect(() => {
    setStatisticsFilter([...statistics]);
  }, [statistics]);

  useEffect(() => {
    const array = [...statistics].filter((item) => {
      const itemDate = new Date(item.timestamp);
      const selectedDate = new Date(date); // Преобразование строки даты в объект Date
      console.log(selectedDate);
      return (
        selectedDate.getFullYear() < itemDate.getFullYear() ||
        (selectedDate.getFullYear() <= itemDate.getFullYear() && selectedDate.getMonth() < itemDate.getMonth()) ||
        (selectedDate.getMonth() <= itemDate.getMonth() && selectedDate.getDate() <= itemDate.getDate())
      );
    });

    array.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });

    setStatisticsFilter(array);
  }, [date]);

  useEffect(() => {
    const max = Math.max(...transformedData.map((data) => data.SUM));
    setMaxSum(max);
  }, [accountId, statisticsFilter]);

  const transformedData = useMemo(() => {
    return statisticsFilter.map((stat, index) => ({
      date: `${dayjs(stat.timestamp).format("DD-MM-YYYY")}`,
      SUM: stat.SUM,
    }));
  }, [statisticsFilter]);

  const calculateDimensions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const chartWidth = Math.min(screenWidth * 1, 800); // Максимум 70% ширины экрана или 800px
    const chartHeight = Math.min(screenHeight * 0.9, 600); // Максимум 60% высоты экрана или 600px
    return { width: chartWidth, height: chartHeight };
  };

  
  const dimensions = useMemo(calculateDimensions, []);

  return (
    <>
    <Header></Header>
    <div style={{position: 'fixed', top: 65, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Дата"
          format="DD/MM/YYYY"
          value={date}
          onChange={setDate}
          />
      </LocalizationProvider>

      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontWeight: 600,
          color: "black",
          marginLeft: "500px",
        }}
        >
        Все продажи
      </Typography>

     
      <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
          <LineChart
            width={dimensions.width}
            height={dimensions.height}
            data={transformedData}
            margin={{ top: 10, right: 40, left: 50, bottom: 80 }}
          >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"date"} angle={-90} textAnchor="end" />
        <YAxis domain={[0, maxSum]} />
        <Tooltip />
        <Line
          type="linear"
          dataKey="SUM" // Используем SUM в качестве dataKey
          activeDot={{ r: 8 }}
          />
      </LineChart>
      </ResponsiveContainer>
    </div>
          </>
  );
}
