


const InfoCard=({icon,label,value,color})=>{
return <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md shadow-slate-900/10">
    <div className={`w-14 h-14 flex items-center justify-center text-[28px] text-white rounded-full ${color} drop-shadow-xl `}>
        {icon}
    </div>
    <div>
        <h6 className="text-sm text-gray-500 mb-1 ">{label}</h6>
        <span className="text-[22px]"><span className="text-green-500 font-medium mr-1 ">₹</span>{value}</span>
    </div>
</div>
}
export default InfoCard;