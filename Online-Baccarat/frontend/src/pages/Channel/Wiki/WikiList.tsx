import { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';

interface WikiList {
  channelId: number | undefined;
}

const WikiList: React.FC<WikiList> = ({ channelId }) => {
  // const [tasks, setTasks] = useState<Task[]>(initialTaskData);
  // const handleDelete = (id: number) => {
  //   setTasks(prevTasks => prevTasks.filter((item) => item.id !== id));
  // };

  return (
    <div className="w-full overflow-y-auto px-5 py-5">
      <div className='w-full shadow rounded-md py-5 px-10 dark:border'>
        <div className='w-full flex-col items-start justify-between'>
          <div className='flex items-center justify-between'>
            <div className='flex'>  
              <p className='mr-5'>投稿者 :</p>
              <p className='font-bold'>投稿者1</p>
            </div>
            <div className='flex'>  
              <p className='mr-5'>投稿日 :</p>
              <p className='font-bold'>2024年07月28日</p>
            </div>
          </div>
          <div className='flex items-start mt-3'>
            <p className='mr-5'>カテゴリー :</p>
            <div className='flex justify-start font-bold text-sm mt-1'>
              <span className='mr-2'>カテゴリー1,</span>
              <span className='mr-2'>カテゴリー2</span>
            </div>
          </div>
          <div className='flex flex-col items-start mt-3'>
            <p className='mr-5'>内容 :</p>
            <div className='text-left font-bold text-sm'>
              dslkfdsflsdfsdl
            </div>
          </div>
          <div className='w-full flex justify-end mt-3'>
            <div className="flex items-center space-x-3.5">
              <Link 
                to={"/channel/task/detailtask/"+channelId} 
                className="hover:text-primary">
                <MdOutlineRemoveRedEye className='text-2xl'/> 
              </Link>
              <Link
                to={"/channel/wiki/updatewiki/"+channelId} 
                className="hover:text-primary">
                <FiEdit className='text-xl'/> 
              </Link>
              <button className="hover:text-primary">
                <RiDeleteBin5Line className='text-xl'/>
              </button>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default WikiList;
