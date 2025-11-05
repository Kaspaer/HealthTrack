export default function ActivityCard({type,calories,durationMin,date}:{type:string;calories:number;durationMin:number;date:string}) {
  return(<div className='p-4 rounded-2xl bg-gray-900 border border-gray-800'>
    <div className='flex justify-between'><span className='font-medium text-gray-200'>{type}</span><span className='text-pink-400'>{calories} cal</span></div>
    <div className='text-sm text-gray-400'>{durationMin} min • {date.slice(0,10)}</div></div>);
}