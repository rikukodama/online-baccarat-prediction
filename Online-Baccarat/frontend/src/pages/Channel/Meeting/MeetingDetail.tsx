import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface MeetingDetailProps {
  id: number | undefined;
}
interface argendaModel {
  id: number,
  type: string, 
  title: string, 
  content: string, 
  purpose: string, 
  deadline: string, 
  decision: string, 
  etc: string
}
const MeetingDetail: React.FC<MeetingDetailProps> = ({ id }) => {
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [meetingArrays, setMeetingArrays] = useState<Array<argendaModel>>([]);
  const [meetTitle, setMeetTitle] = useState("")

  const meetingTypeItems : Array<any> = [
    {
      value : 'discuss',
      label : '議論',
    },
    {
      value : 'share',
      label : '共有',
    },
    {
      value : 'work',
      label : 'タスク',
    }
  ]

  const maxId =(array : Array<argendaModel>)=>{
    if (array.length !== 0) {
      let maxId = array[0].id;
      for (let index = 1; index < array.length; index++) {
        if (array[index].id > maxId) {
          maxId = array[index].id
        }
      }
      return maxId + 1;
    } else {
      return 1;
    }
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const meetingLabel = (value:string) => {
    let result = "";
    switch (value) {
      case "discuss":
        result = "議論"
        break;
      case "share":
        result = "共有"
        break;
      default:
        result = "タスク"
        break;
    }
    return result;
  };
  const createAgenda = (value:string) => {
    setMeetingArrays([...meetingArrays, {
      id:maxId(meetingArrays), 
      type:value, 
      title:'', 
      content:'', 
      purpose:'', 
      deadline:'', 
      decision:'', 
      etc:''}]);
    setIsDropdownVisible(!isDropdownVisible);
  }
  const removeArgendar = (argendaId:number) => {
    setMeetingArrays(meetingArrays.filter(agenda => agenda.id !== argendaId));
  }
  useEffect(()=>{
    setMeetTitle(`Meeting${id}`)
  },[id])

  useEffect(()=>{
    console.log("meetingArrays", meetingArrays)
  },[meetingArrays])

  return (
    <div className='flex h-full w-full flex-col overflow-y-hidden'>
      <div className='w-full flex flex-wrap justify-between items-center rounded-md bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow mt-1 xl:px-10 px-5 py-5'>
        <div className='flex'>
          <span>会議実施日時：2024年06月07日</span>
          <span className='mx-2'>15:00～16:00</span>
        </div>
        <div className='flex'>
          <span>アジェンダ記載期日：2024年06月06日</span>
          <span className='mx-2'>18:00まで</span>
        </div>
        <div className='flex'>
          <span className='mr-2'>参加者：</span>
          <span>〇〇、〇〇、〇〇、〇〇、〇〇</span>
        </div>
        <div className='flex'>
          <span className='mr-2'>議事録作成者：</span>
          <span>〇〇</span>
        </div>
      </div>

      <div className='w-full h-[800px] flex justify-between'>
        <div className='xl:w-[75%] md:w-[60%] h-full flex flex-col rounded-md bg-white duration-300 ease-linear overflow-y-auto dark:bg-boxdark lg:translate-x-0 shadow mt-1 px-10 pb-30'>
          <div className='w-full flex justify-start items-end pt-5'>
            <input value={meetTitle} onChange={(e)=>setMeetTitle(e.target.value)} className='w-full text-xl font-bold outline-none dark:bg-boxdark'/>
          </div>
          <div className='w-full flex-col justify-start items-end pt-5'>
            {
              meetingArrays.length !== 0 && meetingArrays.map((meeting, index)=>{
                return <div key={index} className='flex flex-col items-start w-full px-5 py-5 mb-5 rounded-md shadow-2 dark:border'>
                  <div className='flex justify-between w-full'>
                    <div className='flex items-center mb-2 w-[80%]'>
                      <p className='bg-primary text-white px-2 py-1 rounded text-sm tracking-widest'>{meetingLabel(meeting.type)}</p>
                      <div className='w-[80%] flex ml-2'>
                        <p>{meeting.title}</p>
                        <input className='w-full text-xl font-bold outline-none dark:bg-boxdark'/>
                      </div>
                    </div>
                    <Link
                      to="#"
                      onClick={()=>removeArgendar(meeting.id)}
                    >
                      <RiDeleteBin5Line className='w-5 h-5' />
                    </Link>
                  </div>
                  <div className='w-full flex my-1 items-center'>
                    <p>内容: {meeting.content}</p>
                    <input className='w-[90%] ml-2 outline-none dark:bg-boxdark'/>
                  </div>
                  <div className='w-full flex my-1 items-center'>
                    <p>ゴール: {meeting.purpose}</p>
                    <input className='w-[80%] ml-2 outline-none dark:bg-boxdark'/>
                  </div>
                  <div className='w-full flex my-1 items-center'>
                    <p>期日: {meeting.deadline}</p>
                    <input className='w-[80%] ml-2 outline-none dark:bg-boxdark'/>
                  </div>
                  <div className='w-full flex my-1 items-center'>
                    <p>決定事項: {meeting.decision}</p>
                    <input className=' w-[80%] ml-2 outline-none dark:bg-boxdark'/>
                  </div>
                  <div className='w-full flex my-1 items-center'>
                    <p>備考: {meeting.etc}</p>
                    <input className='w-[80%] ml-2 outline-none dark:bg-boxdark'/>
                  </div>
                </div>
              })
            }
          </div>
          <div className='w-full flex-col justify-start items-end pt-5'>
            <Link
              to="#"
              onClick={toggleDropdown}
              className="inline-flex items-center md:text-sm xl:text-base justify-center rounded-md border border-primary py-2 md:px-2 px-3 text-center font-medium text-white bg-primary hover:bg-opacity-90"
            >
              <IoMdAdd className='mr-2'/>
              アジェンダの種類を選択
            </Link>
            {isDropdownVisible && (
              <div className="mt-2 xl:w-54 md:w-50 rounded-md bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-lg">
                {
                  meetingTypeItems.map((item, index)=>{
                    return (
                      <Link key={index} to="#" onClick={()=>createAgenda(item.value)} className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-100">{item.label}</Link>
                    );                    
                  })
                }
              </div>
            )}
          </div>
        </div>

        <div className='xl:w-[24.5%] md:w-[39.5%] h-full flex flex-col justify-start items-start rounded-md bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow mt-1 px-10 py-10'>
          <span className='text-md font-bold'>アジェンダ一覧</span>
          <div className='flex flex-col text-sm mt-2'>
            <Link to="" className='mt-1'>来年度のリード獲得施策について</Link>
            <Link to="" className='mt-1'>WEBマーケティング流入数推移</Link>
          </div>
        </div>
      </div>
      
      {/* bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 */}
    </div>
  );
};

export default MeetingDetail;
