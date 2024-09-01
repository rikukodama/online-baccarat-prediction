import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { GrDocumentText } from "react-icons/gr";
import { IoStatsChart } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoMdAdd } from 'react-icons/io';
import CheckboxMeeting from '../components/Checkboxes/CheckboxMeeting';
import CheckboxTask from '../components/Checkboxes/CheckboxTask';
import CheckboxWiki from '../components/Checkboxes/CheckboxWiki';
import AddLinkModal from './AddLinkModal';

interface AddTagProps {
  modalTag: boolean;
  showMeeting: boolean;
  showTask: boolean;
  showWiki: boolean;
  setModalTag: (arg: boolean) => void;
  setShowMeeting: (arg: boolean) => void;
  setShowTask: (arg: boolean) => void;
  setShowWiki: (arg: boolean) => void;
}

const AddTag = ({ modalTag, showMeeting, showTask, showWiki, setModalTag, setShowMeeting, setShowTask, setShowWiki }: AddTagProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [showAddLinkModal, setShowAddLinkModal] = useState<boolean>(false);
  const [links, setLinks] = useState<{title:string, link:string}[]>([]);

  const handleAddLink = (title:string, link:string) => {
    console.log("======", link)
    setLinks([...links, {title, link}]);
  };
  useEffect(()=>{
    console.log(links)
  }, links)

  return (
    <div
      className={`fixed inset-0 flex w-screen h-screen z-9999 flex-col duration-300 dark:bg-boxdark ${modalTag ? 'block' : 'hidden'}`}
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] xl:w-1/3 md:w-1/2 h-[80%] xl:h-2/3 md:h-3/4 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={() => setModalTag(false)} className='w-8 h-8 text-black dark:text-white hover:text-primary'><IoMdClose className='w-full h-full' /></button>
        </div>
        <div>
          <div className="border-b border-stroke px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-center text-black dark:text-white">
            タブの管理
            </h3>
          </div>
          <div className="flex flex-col px-6.5 pt-2">
            <div className='w-full'>
              <div className='flex flex-col items-start w-full'>
                <p className='font-bold'>機能の選択</p>
                <div className='text-xs my-1'>
                  <p>ルーム毎に利用する機能を選択しましょう。</p>
                  <p>後からオフにしても中身が消えることはありません。</p>
                </div>
                <div className='w-full flex items-center py-2 px-3 mb-2 border rounded-md'>
                  <CheckboxMeeting showMeeting = {showMeeting} setShowMeeting={ setShowMeeting } /> 
                  <div className='w-10 h-10 p-1 border rounded'>
                    <GrDocumentText className='w-full h-full'/>
                  </div>
                  <div className='flex flex-col items-start ml-2'>
                    <span className='font-bold'>会議</span>
                    <span className='text-xs'>議題を事前共有。議事録も残せます</span>
                  </div>
                </div>

                <div className='w-full flex items-center py-2 px-3 mb-2 border rounded-md'>
                  <CheckboxTask showTask = {showTask} setShowTask={ setShowTask } /> 
                  <div className='w-10 h-10 p-1 border rounded'>
                    <IoStatsChart className='w-full h-full'/>
                  </div>
                  <div className='flex flex-col items-start ml-2'>
                    <span className='font-bold'>タスク</span>
                    <span className='text-xs'>カンバン形式でタスクを管理しよう</span>
                  </div>
                </div>

                <div className='w-full flex items-center py-2 px-3 mb-2 border rounded-md'>
                  <CheckboxWiki showWiki = {showWiki} setShowWiki={ setShowWiki } /> 
                  <div className='w-10 h-10 p-1 border rounded'>
                    <HiOutlineClipboardDocumentList className='w-full h-full'/>
                  </div>
                  <div className='flex flex-col items-start ml-2'>
                    <span className='font-bold'>Wiki</span>
                    <span className='text-xs'>あらゆる情報をストックしよう</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-start w-full'>
                <p className='font-bold'>リンク</p>
                <div className='text-xs my-1'>
                  <p>このルームのメンバーでよく使うリンクを追加しよう。</p>
                  <p>外部資料やビデオミーティングツールがおすすめです。</p>
                </div>
                <Link to="" onClick={() => setShowAddLinkModal(true)} className='w-full flex items-center py-2 px-3 border rounded-md'>
                  <IoMdAdd className='w-5 h-5 mr-2' /> 
                  <div className='w-10 h-10 p-1 border rounded'>
                    <GrDocumentText className='w-full h-full'/>
                  </div>
                  <div className='flex flex-col items-start ml-2'>
                    <span className='font-bold'>リンクを追加</span>
                    <span className='text-xs'>ページリンクを追加出来ます</span>
                  </div>
                </Link>
                
              </div>
            </div>
            <div className='w-full md:h-10 py-2 mt-2 overflow-y-auto'>
              {
                links.map((item)=>{
                  return <div>
                    {item.title}:<Link to={item.link} target="_blank" className='underline'>{item.link}</Link>
                  </div>
                })
              }
            </div>            
            
            <button
              onClick={() => setModalTag(false)}
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              追 加
            </button>
            
          </div>
        </div>
      </div>
      <AddLinkModal
        show={showAddLinkModal}
        onClose={() => setShowAddLinkModal(false)}
        onAddLink={handleAddLink}
      />
    </div>
  );
};

export default AddTag;
