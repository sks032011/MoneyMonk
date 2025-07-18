import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import useUserAuth from '../../hooks/useUserAuth';         ///????????????????????????????????
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';



const Income = () => {
  useUserAuth() //?????????????????????????
  const [openAddIncomeMod, setOpenAddIncomeMod] = useState(false);
  const[incomeData, setIncomeData] = useState([]);
  const[loading, setLoading] = useState(false);
  const[openDltAlert, setOpenDltAlert] = useState({
    show: false,
    data: null,
  });

  // Function to fetch income data from the server
  const fetchIncomeData = async () => {
    if (loading) return; // Prevent multiple calls
    setLoading(true);
    try {
      const res=await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);

      if (res.data && Array.isArray(res.data.data)) {
      setIncomeData(res.data.data); // <-- Only set the array!
    } else {
      setIncomeData([]); // fallback to empty array
    }
  } catch (error) {
    console.log("Error fetching income data:", error);
    setIncomeData([]); // fallback to empty array on error
  } finally {
    setLoading(false);
  }
  }

  useEffect(()=>{
    fetchIncomeData();

    return ()=>{};
  },[])
  // Function to handle adding income
  const handleAddIncome = async (income) => {
    const {category,amount,date,icon}=income;

    //validation check 
    if(!category.trim()){
      toast.error("Source is required")
      return ;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid no greater than 0")
      return ;
    }
    if(!date){
      toast.error("Date is required")
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
      category,
      amount, 
      date,
      icon 
      })
      setOpenAddIncomeMod(false);
      toast.success("Income added gracefully!!")
      fetchIncomeData();
    } catch (error) {
      console.log(error)
    }

  }

  // Function to handle deleting income
  const deleteIncome = async (incomeId) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId))

      setOpenDltAlert({show:false,data:null})
      toast.success("DELETED !!")
      fetchIncomeData();

    } catch (error) {
      console.log(error.message)
    }
  }

  // downlaod income
  const handleDownloadIncome = async () => {
try {
      const res= await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType:"blob"
        }
      );

      //create url for blob 
      const url=window.URL.createObjectURL(new Blob([res.data] ))
      const link=document.createElement("a")
      link.href=url
      link.setAttribute("download","income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.log(error.message)
      toast.error("failed to download")
    }  }

  return (
    <DashboardLayout activeMenu="Income">
      
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
          <IncomeOverview
          transactions={incomeData}
          onAddIncome={()=>setOpenAddIncomeMod(true)} // Function to open the add income modal  
          />
          </div>
          <IncomeList
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDltAlert({show:true,data:id})
          }}
          onDownload={handleDownloadIncome}
          />
        </div>

        <Modal 
        isOpen={openAddIncomeMod}
        onClose={()=>setOpenAddIncomeMod(false)}
        title="Add Income"
        >
        <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
        isOpen={openDltAlert.show}
        onClose={()=>setOpenDltAlert({show:false,data:null})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure You wanna delete this income?"
           onDelete={()=>deleteIncome(openDltAlert.data)}
          />
        </Modal>



      </div>
</DashboardLayout>
  )
}

export default Income
