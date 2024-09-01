import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin5Line } from "react-icons/ri";
import CheckboxAllSheet from '../../../components/Checkboxes/CheckboxAllSheet';
import CheckboxOneSheet from '../../../components/Checkboxes/CheckboxOneSheet';
import MeetingDetail from './MeetingDetail';

const MeetingManage: React.FC = () => {
  // const params = useParams();
  // const [params] = useSearchParams();
  
  const [selectId, setSelectId] = useState(1);
  const [Id, setId]=useState(useParams().channelID);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [meets, setMeets] = useState([
    {
      id:1,
      title:"Meeting1",
      date:"2024-07-08"
    }
  ])

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${year}年${month}月${day}日`;
  };
  const addMeeting = () => {
    const newMeeting = {
      id: meets.length + 1, // or a better unique ID logic
      title: `Meeting${meets.length + 1}`,
      date: new Date().toISOString().split('T')[0] // Current date in 'YYYY-MM-DD' format
    };
    setMeets([...meets, newMeeting]);
  };

  const handleCheckChange = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckAllChange = (isChecked: boolean) => {
    const newCheckedItems: { [key: number]: boolean } = {};
    meets.forEach(meet => {
      newCheckedItems[meet.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleDeleteChecked = () => {
    setMeets(meets.filter(meet => !checkedItems[meet.id]));
    setCheckedItems({});
  };


  return (
      <>
        <div className="flex flex-col xl:h-[800px] md:h-[710px] w-72.5 rounded-md mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
          <div className='flex flex-wrap justify-between items-center px-3 py-5'>
            <div className='flex items-center'>
              <CheckboxAllSheet onCheckAllChange={handleCheckAllChange}/>
              <Link
                to="#"
                onClick={addMeeting}
                className="inline-flex items-center md:text-sm xl:text-base justify-center rounded-md border border-primary py-2 md:px-2 px-3 text-center font-medium text-white bg-primary hover:bg-opacity-90"
              >
                <IoMdAdd className='mr-2'/>
                会議を作成
              </Link>
            </div>
            <Link
              to="#"
              onClick={handleDeleteChecked}
            >
              <RiDeleteBin5Line className='w-5 h-5' />
            </Link>
          </div>
          <div className='overflow-y-auto'>
            {
              meets.map((meet,index)=>{
                return <div key={index} className='flex justify-start items-center px-3 hover:bg-boxdark mb-2 hover:text-white duration-300 hover:rounded'>
                  <CheckboxOneSheet 
                    id={meet.id}
                    isChecked={checkedItems[meet.id] || false} 
                    onCheckChange={handleCheckChange} 
                  />
                  <Link to="" onClick = {()=>setSelectId(meet.id)} className='flex flex-col items-start'>
                    <p>{formatDate(meet.date)}</p>
                    <p className='font-bold'>{meet.title}</p>
                  </Link>
                </div>
              })
            }
          </div>
        </div>
        <div className="flex xl:h-[800px] md:h-[710px] md:w-full w-50 mx-1 flex-col">
          <MeetingDetail id={selectId}/>
        </div>
        </>
  );
};

export default MeetingManage;
