import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from 'react-icons/io';
import { addThousandSeperator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanaceOverview from '../../components/Dashboard/FinanaceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';


const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    // if (loading) return; // prevent multiple calls
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (e) {
      console.log("something went wrong", e)
    }
    finally {
      setLoading(false);

    }
  }

  useEffect(() => {

    fetchDashboardData();
    console.log("dashboardData", dashboardData)

    return () => {

    }
  }, [])


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-6 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeperator(dashboardData?.totalBalance || 0)}
            color="bg-blue-800"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeperator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate('/expense')}
          />
          <FinanaceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last60DaysExpense?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions.slice(0, 4) || []}
            totalIncome={dashboardData?.last60DaysIncome?.total || 0}
          />

          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate('/income')}
          />


        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
