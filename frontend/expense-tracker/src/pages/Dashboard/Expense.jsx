import React, { useEffect, useState } from 'react'
import useUserAuth from '../../hooks/useUserAuth';         ///????????????????????????????????
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';


const Expense = () => {
  useUserAuth();

  const [openAddExpenseMod, setOpenAddExpenseMod] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDltAlert, setOpenDltAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseData = async () => {
    if (loading) return; // prevent multiple calls
    setLoading(true);


    try {
      const res = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);

      if (res.data && Array.isArray(res.data.data)) {
        setExpenseData(res.data.data); // -- onky set the array
      } else {
        setExpenseData([]); // fallback to empty array
      }
    } catch (error) {
      console.log("Error fetching expense data:", error);
      setExpenseData([]); // fallback to empty array on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenseData();

    return () => { };
  }, [])
  // Function to handle adding expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //validation check 
    if (!category.trim()) {
      toast.error("Source is required")
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid no greater than 0")
      return;
    }
    if (!date) {
      toast.error("Date is required")
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })
      setOpenAddExpenseMod(false);
      toast.success("expense added gracefully!!")
      fetchExpenseData();
    } catch (error) {
      console.log(error)
    }


  }

  const deleteExpense=async (id)=>{
   try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDltAlert({show:false,data:null})
      toast.success("DELETED !!")
      fetchExpenseData();

    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDownloadExpense=async () => {
    try {
      const res= await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob"
        }
      );

      //create url for blob 
      const url=window.URL.createObjectURL(new Blob([res.data] ))
      const link=document.createElement("a")
      link.href=url
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.log(error.message)
      toast.error("failed to download")
    }
  }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseMod(true)}
            />
           
          </div>
          <ExpenseList
          transactions={expenseData}
          onDelete={(id)=>{
            setOpenDltAlert({show:true,data:id})
          }}
          onDownload={handleDownloadExpense}
          />
        </div>
        <Modal
          isOpen={openAddExpenseMod}
          onClose={() => setOpenAddExpenseMod(false)}
          title="Add expense">
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
        <Modal
        isOpen={openDltAlert.show}
        onClose={()=>setOpenDltAlert({show:false,data:null})}
        title="Delete Expense"
        >
          <DeleteAlert
          content="Are you sure You wanna delete this expense info?"
           onDelete={()=>deleteExpense(openDltAlert.data)}
          />
        </Modal>
      </div>

    </DashboardLayout>

  )
}

export default Expense
