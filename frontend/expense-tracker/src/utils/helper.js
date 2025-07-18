import moment from "moment";

export const validateemail = (email) => {
    // Requires at least one dot after @ and at least 2 chars for TLD
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const addThousandSeperator=(num)=>{
    if (typeof num !== 'number') {
        return num; // Return the original value if it's not a number
    }
    const [integerPart, decimalPart] = num.toString().split('.');
    //what we r doin is we r splitting the number into integer and decimal part and then we r adding the thousand separator to the integer part ex: 1000 => 1,000
   
    // Better approach:
    // If length <= 3, return as is
    // Else, split last 3, then add commas every 2 digits before that
    // Example: 12345678 => 1,23,45,678
    // Implementation:
    // if (integerPart.length <= 3) {
    //     formattedInteger = integerPart;
    // } else {
    //     const lastThree = integerPart.slice(-3);
    //     const otherNumbers = integerPart.slice(0, -3);
    //     formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ',' + lastThree;
    // }
    const formattedInteger = integerPart.length <= 3
        ? integerPart
        : integerPart.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ',' + integerPart.slice(-3);
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    
}
// data=[] means that if no data is passed, it will be an empty array
export const prepareExpenseBarChartData = (data=[]) => {
const charData =data.map((item)=>({
    category: item?.category,
    amount: item?.amount,
}))
return charData;
}

export const prepareIncomeBcData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));

    const charData=sortedData.map((item)=>({
        month:moment(item?.date).format('DD MMM'),
        amount:item?.amount,
        category:item?.category
    }))
    return charData; 

}

export const prepareExpenseLineChartData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
     const charData=sortedData.map((item)=>({
        month:moment(item?.date).format('DD MMM'),
        amount:item?.amount,
        category:item?.category
    }))
    return charData;
}