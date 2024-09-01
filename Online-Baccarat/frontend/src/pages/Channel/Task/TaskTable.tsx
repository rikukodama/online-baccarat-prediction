import { useState } from 'react';
import { Task } from '../../../types/task';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';

interface TaskTable {
  channelId: number | undefined;
  initialTaskData: Task[];
}

const TaskTable: React.FC<TaskTable> = ({ channelId, initialTaskData }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTaskData);
  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter((item) => item.id !== id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              No
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              タイトル
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              作成者
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              作成日
              </th>
              <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
              担当者
              </th>
              <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
              期日
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              トレイ
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              編集/削除
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((taskItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {key+1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {taskItem.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {taskItem.creater}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {taskItem.updatedDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {
                    taskItem.contactor.map((item, index)=>{
                      const isLastItem = index === taskItem.contactor.length - 1;
                      return <span key={index} className="text-black dark:text-white mr-1">
                        {item}{!isLastItem && ','}
                      </span>
                    })
                  }
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {taskItem.startDate} ~ {taskItem.endDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      taskItem.status === '完了'
                        ? 'bg-success text-success'
                        : taskItem.status === '未対応'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {taskItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link 
                      to={"/channel/task/detailtask/"+channelId} 
                      className="hover:text-primary">
                      <MdOutlineRemoveRedEye className='text-2xl'/> 
                    </Link>
                    <Link
                      to={"/channel/task/updatetask/"+channelId} 
                      className="hover:text-primary">
                      <FiEdit className='text-xl'/> 
                    </Link>
                    <button onClick={()=>handleDelete(taskItem.id)} className="hover:text-primary">
                      <RiDeleteBin5Line className='text-xl'/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
