import React from 'react'
// import box1 from '../../public/box1.png'
function box({ id, url, headline, detail }) {
  let marginValue = ((id - 1) * 100);
  marginValue = marginValue.toString();
  console.log(typeof (marginValue))
  return (
    <div className={`w-[450px] md:w-[400px]  h-[80px] rounded-md bg-[#292738] flex gap-3 items-center`} style={{ marginRight: marginValue + 'px' }}>
      <img src={url} className='h-[70px] ml-2' alt="" />
      <span className='flex flex-col '>
        <div className='text-xl font-bold'>{headline}
        </div>
        <div className='text-sm text-[#67687A]'>{detail}</div>
      </span>

    </div>
  )
}

export default box