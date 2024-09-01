import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePickerStart from '../../../components/Forms/DatePicker/DatePickerStart';
import DatePickerEnd from '../../../components/Forms/DatePicker/DatePickerEnd';
import SelectStatus from '../../../components/Forms/SelectGroup/SelectStatus';
import MultiSelect from '../../../components/Forms/MultiSelect';

import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineSaveAs } from "react-icons/md";

const DetailTask: React.FC = () => {
  const navigate = useNavigate();
  const Id = useParams().channelId;
  const saveTask = () => {
    navigate("/channel/task/"+Id);
  }
  return (
    <div className="flex flex-col xl:h-[800px] md:h-[710px] w-full rounded-md py-10 mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
      <div className="w-full flex justify-center mt-10">
        <div className='max-w-screen-md flex flex-col'>
          <p className='text-3xl text-center font-bold mb-5 text-black dark:text-white'>タスクタイトル</p> 
          <div className='flex flex-col items-start px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5">
              概要
            </label>
            <div className='text-sm'>
              タスクについて簡単に説明してください。
            </div>
          </div>
          <div className='flex items-center px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5 mt-3">
              期日:
            </label>
            <span className='mx-1'>{"2024年08月01日"} ~ {"2024年08月08日"}</span>
          </div>
          <div className='flex items-center px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5 mt-3">
            トレイ:  
            </label>
            <span className='mx-1'>{"完了"}</span>
          </div>
          <div className='flex flex-col items-start px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5 mt-3">
            担当者:
            </label>
            <div className='flex'>
              <span className='mr-2'>{"ozasa"}, </span>
              <span className='mr-2'>{"Abe Tadao"} </span>
            </div>
          </div>
          <div className='flex items-center px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5 mt-3">
            作成者:
            </label>
              <span className='mr-2'>{"Abe Tadao"}</span>
          </div>
          <div className='flex items-center px-5 py-2'>
            <label className="mb-3 block text-black dark:text-white font-bold mr-5 mt-3">
            作成日:
            </label>
            <span className='mx-1'>{"2024年08月01日"}</span>
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
      </div>
    </div>
  );
};

export default DetailTask;
