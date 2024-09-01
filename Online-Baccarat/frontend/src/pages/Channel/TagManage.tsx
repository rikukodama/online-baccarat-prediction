import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import AddTag from '../../layout/AddTag';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface TagManage {
  channelId: number | undefined;
}
const TagManage: React.FC<TagManage> = ({ channelId }) => {
  const {channels} = useSelector((store:RootState) => store.channel);
  const [modalTag, setModalTag] = useState(false);
  const [showMeeting, setShowMeeting] = useState(true);
  const [showTask, setShowTask] = useState(true);
  const [showWiki, setShowWiki] = useState(true);
  
  return (
    <div className='w-full px-[5px]'>
      <div className='flex justify-start items-center font-bold h-[60px] my-[3px] px-5 w-full rounded-md bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow'>
        <span className='text-xl w-62.5'>{channels?.filter((item:any)=>{return item._id == channelId})[0]?.name}</span>
        <div className='flex mx-3'>
          {
            showMeeting && <Link className='mx-2' to={"/channel/"+channelId}>会議</Link>
          }
          {
            showTask && <Link className='mx-2' to={"task/"+channelId}>タスク</Link>
          }
          {
            showWiki && <Link className='mx-2' to={"wiki/"+channelId}>Wiki</Link>
          }
        </div>
        <Link
          onClick={()=>setModalTag(true)}
          to="#"
          className="inline-flex items-center md:text-sm mx-5 justify-center rounded-md border border-primary py-1 md:px-2 px-3 text-center font-medium text-primary dark:border-zinc-300 dark:text-zinc-300"
        >
          <IoMdAdd className='mr-1'/>
          タブ管理
        </Link>
      </div>
      <AddTag 
        modalTag = {modalTag} 
        showMeeting = {showMeeting} 
        showTask = {showTask} 
        showWiki = {showWiki} 
        setModalTag={ setModalTag }
        setShowMeeting = {setShowMeeting} 
        setShowTask = {setShowTask}
        setShowWiki = {setShowWiki} 
        />
    </div>
  );
};

export default TagManage;
