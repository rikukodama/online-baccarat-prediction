import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import SelectName from '../../../components/Forms/SelectGroup/SelectName';
import DatePickerUpdate from '../../../components/Forms/DatePicker/DatePickerUpdate';
import WikiList from './WikiList';

const WikiManage: React.FC = () => {
  const Id = useParams().channelId;
  const [postState, setPostState] = useState("all");
  return (
    <div className="flex flex-col xl:h-[800px] md:h-[710px] w-full rounded-md mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
      <div className='w-full flex flex-wrap'>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          投稿者:
          </label>
          <SelectName />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          投稿日:
          </label>
          <DatePickerUpdate />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          内容:
          </label>
          <input
            type="text"
            className="w-[400px] rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className='w-full flex justify-between px-3'>
        <div>
          <button
            onClick={()=>setPostState("all")}
            className={`inline-flex items-center justify-center rounded-md border border-success py-2 px-10 mx-3 text-center text-sm font-medium hover:bg-opacity-90 lg:px-8 xl:px-10 active:text-white active:bg-success ${postState=='all'?'text-white bg-success':'text-success'}`}
          >
            全ての投稿
          </button>
          <button
            onClick={()=>setPostState("self")}
            className={`inline-flex items-center justify-center rounded-md border border-success py-2 px-10 mx-3 text-center text-sm font-medium hover:bg-opacity-90 lg:px-8 xl:px-10  active:text-white active:bg-success ${postState=='self'?'text-white bg-success':'text-success'}`}
          >
            自分の投稿
          </button>
        </div>
        <Link
          to={"/channel/wiki/addwiki/"+Id}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 mx-5 mb-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoMdAdd className='text-xl mr-2'/>
          新規投稿追加
        </Link>
      </div>
      <div className='w-full overflow-y-auto px-3 py-5'>
        <WikiList channelId={1} />

      </div>
    </div>
  );
};

export default WikiManage;
