import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TaskTable from './TaskTable';
import DatePickerStart from '../../../components/Forms/DatePicker/DatePickerStart';
import DatePickerEnd from '../../../components/Forms/DatePicker/DatePickerEnd';
import DatePickerUpdate from '../../../components/Forms/DatePicker/DatePickerUpdate';
import SelectContactName from '../../../components/Forms/SelectGroup/SelectContactName';
import SelectStatus from '../../../components/Forms/SelectGroup/SelectStatus';
import { Task } from '../../../types/task';

const initialTaskData: Task[] = [
  {
    id:1,
    title: "タスク1",
    summary: "summary1",
    creater: "Abe Tadao",
    updatedDate: "2024年07月25日",
    contactor: ["ozasa"],
    startDate: "2024年08月01日",
    endDate: "2024年08月01日",
    status: "完了",
  },
  {
    id:2,
    title: "タスク2",
    summary: "summary2",
    creater: "Abe Tadao",
    updatedDate: "2024年07月26日",
    contactor: ["ozasa", "Abe Tadao"],
    startDate: "2024年08月01日",
    endDate: "2024年08月10日",
    status: "完了",
  },
  {
    id:3,
    title: "タスク3",
    summary: "summary3",
    creater: "ozasa",
    updatedDate: "2024年07月27日",
    contactor: ["Abe Tadao"],
    startDate: "2024年08月01日",
    endDate: "2024年09月11日",
    status: "未対応",
  },
  {
    id:4,
    title: "タスク4",
    summary: "summary4",
    creater: "Abe Tadao",
    updatedDate: "2024年07月28日",
    contactor: ["ozasa"],
    startDate: "2024年08月02日",
    endDate: "2024年09月01日",
    status: "対応中",
  },
  {
    id:5,
    title: "タスク4",
    summary: "summary5",
    creater: "Abe Tadao",
    updatedDate: "2024年07月28日",
    contactor: ["ozasa"],
    startDate: "2024年08月02日",
    endDate: "2024年09月01日",
    status: "対応中",
  },
  {
    id:6,
    title: "タスク4",
    summary: "summary6",
    creater: "Abe Tadao",
    updatedDate: "2024年07月28日",
    contactor: ["ozasa"],
    startDate: "2024年08月02日",
    endDate: "2024年09月01日",
    status: "対応中",
  }
];

const TaskManage: React.FC = () => {
  const Id = useParams().channelId;
  
  const [tasks, setTasks] = useState<Task[]>(initialTaskData);

  return (
    <div className="flex flex-col xl:h-[800px] md:h-[710px] w-full rounded-md mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
      <div className='w-full flex flex-wrap'>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
            タイトル:
          </label>
          <input
            type="text"
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
            期日:
          </label>
          <DatePickerStart />
          <span className='mx-5'>~</span>
          <DatePickerEnd />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          トレイ:
          </label>
          <SelectStatus />
        </div>
      </div>

      <div className='w-full flex flex-wrap'>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
            作成者:
          </label>
          <input
            type="text"
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          作成日:
          </label>
          <DatePickerUpdate />
        </div>
        <div className='flex items-center px-5 py-5'>
          <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
          担当者:
          </label>
          <SelectContactName />
        </div>
      </div>
      <div className='w-full flex justify-end px-3'>
        <Link
          to={"/channel/task/addtask/"+Id}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 mx-5 mb-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoMdAdd className='text-xl mr-2'/>
          タスクを追加
        </Link>
      </div>
      <div className='w-full overflow-y-auto px-3 py-5'>
        <TaskTable channelId={Id} initialTaskData={initialTaskData}/>
      </div>
    </div>
  );
};

export default TaskManage;
