import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePickerStart from '../../../components/Forms/DatePicker/DatePickerStart';
import DatePickerEnd from '../../../components/Forms/DatePicker/DatePickerEnd';
import SelectStatus from '../../../components/Forms/SelectGroup/SelectStatus';
import MultiSelect from '../../../components/Forms/MultiSelect';

import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineSaveAs } from "react-icons/md";

const UpdateTask: React.FC = () => {
  const navigate = useNavigate();
  const Id = useParams().channelId;
  const saveTask = () => {
    navigate("/channel/task/"+Id);
  }
  return (
    <div className="flex flex-col xl:h-[800px] md:h-[710px] w-full rounded-md py-10 mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
      <div className="w-full flex justify-center mt-10">
        <div className='flex flex-col'>
          <p className='text-3xl text-center font-bold mb-5 text-black dark:text-white'>タスクの変更</p> 
          <div className='flex items-center px-5 py-5'>
            <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
              タイトル:
            </label>
            <input
              type="text"
              placeholder='タスクタイトルを入力してください。'
              className="w-[60%] rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className='flex flex-col items-start px-5 py-5'>
            <label className="mb-3 block text-black dark:text-white mr-5">
            概要: <span className='text-sm'> (タスクについて簡単に説明してください。)</span>
            </label>
            <textarea
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
          <div className='flex items-center px-5 py-5'>
            <label className="mb-3 block text-black dark:text-white mr-5 mt-3">
            担当者:
            </label>
            <MultiSelect />
          </div>
        </div>
      </div>
      
      <div className='w-full flex justify-center px-3 mt-10'>
        <Link
          to={"/channel/task/"+Id}
          className="inline-flex items-center justify-center rounded-md border border-success py-2 px-20 mx-5 text-center font-medium text-success hover:bg-opacity-90 lg:px-8 xl:px-20"
        >
          <MdArrowBackIosNew className='mr-2'/>
          戻る
        </Link>
        <button
          onClick={saveTask}
          className="inline-flex items-center justify-center rounded-md bg-success py-2 px-20 mx-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
        >
          <MdOutlineSaveAs className='mr-2' />
          変更
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
