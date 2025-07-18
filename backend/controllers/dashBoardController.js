const Income = require("../models/Income");
const Expense = require("../models/Expenses");

const { isValidObjectId, Types } = require("mongoose"); //Types is an object that contains various utility fns . which can be used to create new objectId instances

//dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; //which is like for ex "64b8f4c2e4b0a1d3f8e4b0a1d"
    const userObjectId = new Types.ObjectId(String(userId)); //see txt ....we can use this to create a new objectId instance from the string representation of the userId   In MongoDB, _id values are of type ObjectId, not strings.When querying MongoDB (especially in aggregation), we must convert the user ID string to an ObjectId.

    //les use aggregation pipeline to get the total income and expense
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }, //get for all so id is null
    ]);
    console.log("totalIncome", {
      totalIncome,
      userId: isValidObjectId(userId),
    });
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("totalExpense", {
      totalExpense,
      userId: isValidObjectId(userId),
    }); //txt 90

    //getting last 60 days income transactions
    const last60DaysIncomeTransactions = await Income.find({
      userId: userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), //60 days ago
      },
    }).sort({ date: -1 });

    //total income for last 60 days
    const incomeForLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //getting last 60 days expense transactions
    const last60DaysExpenseTransactions = await Expense.find({
      userId: userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), //60 days ago
      },
    }).sort({ date: -1 });

    console.log("last60DaysExpenseTransactions", {
      last60DaysExpenseTransactions,
      userId: isValidObjectId(userId),
    });

    //total expense for last 60 days
    const expenseForLast60Days = last60DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    console.log("expenseForLast60Days", { expenseForLast60Days });

    //fetch last 5 trans (income+exp)
    const lastTransactions = [
      //txt 102
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          ...transaction.toObject(), //maps each income transaction to a new object that includes all the original transaction properties, plus a new type property set to 'income'.

          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          ...transaction.toObject(),
          type: "expense",
        })
      ),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5); //sort by date latest first
    // its like a single array of both income and expense transactions, each with a type property indicating whether it's an income or expense transaction. The array is then sorted by date in descending order, and only the last 5 transactions are kept.

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last60DaysExpense: {
        transactions: last60DaysExpenseTransactions,
        total: expenseForLast60Days,
      },
      last60DaysIncome: {
        transactions: last60DaysIncomeTransactions,
        total: incomeForLast60Days,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//MongoDB is type-sensitive when matching. A string and an ObjectId are not the same
//reducer is a function that takes two arguments, an accumulator (initial value) and a current value. It iterates over each element in the array, applying the function to accumulate a single result. In this case, it sums up the amounts of all transactions in the last 60 days. ,0 is the initial value of the sum
