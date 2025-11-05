export default function GoalProgress({title,current,target,unit}:{title:string;current:number;target:number;unit:string}) {
  const pct=Math.min(100,Math.round((current/target)*100));
  return(<div className='p-4 rounded-2xl bg-gray-900 border border-gray-800'>
    <div className='flex justify-between mb-2 text-sm text-gray-300'><span>{title}</span><span className='text-gray-400'>{current}/{target} {unit}</span></div>
    <div className='h-2 bg-gray-800 rounded-full overflow-hidden'><div className='h-full bg-pink-500' style={{width:${pct}%}}></div></div>
  </div>);
}