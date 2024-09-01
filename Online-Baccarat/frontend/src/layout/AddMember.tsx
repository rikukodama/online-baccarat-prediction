import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatechannel } from "../redux/channelSlice";

interface AddMemberProps {
  memberModalVisible: boolean;
  setMemberModalVisible: (arg: boolean) => void;
}

const AddMember = ({ memberModalVisible, setMemberModalVisible }: AddMemberProps) => {
  const {channels} = useSelector((store:RootState) => store.channel);
  const {users,user} = useSelector((store:RootState) => store.user);
  const [errorMessage, setErrorMessage] = useState("");

  const [invite_users, setInvites] = useState([]);
  const [invite_user, setUsers] = useState([]);
  const [invite, setInvite]=useState<string>('');
  const [name, setName] = useState<string>('');

  const location = useLocation();
  const { pathname } = location;
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = (e:any) => {
    setSelectedOption(e)
    setIsOptionSelected(true);
    setInvites(channels?.filter((item:any)=>item.name==e)[0].invite_users?.map((items:any)=>{return items.username}));
    setUsers(channels?.filter((item:any)=>item.name==e)[0].invite_users?.map((items:any)=>{return items._id}));
    setName(channels?.filter((item:any)=>item.name==e)[0]._id);
  };
  const create = () => {
    if(invite)  {
      setInvites((c)=>[...c, invite])
      setUsers((c)=>[...c, users.filter((item:any)=>{return item.username==invite})[0]._id])
    }
  }

  const dispatch = useDispatch();
  const update = async() => {
    const res = await dispatch(updatechannel({id:name, name:selectedOption,  create_user:user._id, invite_users:invite_user}))
    setErrorMessage(res.payload.message)
    setSelectedOption('');
    setInvite('');
    setInvites([]);
    setUsers([]);
    
  }
  return (
    <div
      className={`fixed inset-0 flex w-screen h-screen z-9999 flex-col duration-300 dark:bg-boxdark ${memberModalVisible ? 'block' : 'hidden'}`}
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] md:w-1/3 h-[80%] md:h-2/3 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={() => setMemberModalVisible(false)} className='w-8 h-8 text-black dark:text-white hover:text-primary'><IoMdClose className='w-full h-full' /></button>
        </div>
        <div>
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-center text-black dark:text-white">
            新規ユーザーを追加する
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
              チャンネル一覧
              </label>
              <div className="relative bg-white dark:bg-form-input">
                <select
                  value={selectedOption}
                  onChange={(e) => {
                    changeTextColor(e.target.value);
                  }}
                  className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? 'text-black dark:text-white' : ''
                  }`}
                >
                  <option value={""} disabled></option>
                  {
                    channels?.map((item:any, index:number)=>(
                      <option key={index} value={item.name} className="text-body dark:text-bodydark">
                        {item.name}
                      </option>
                    ))
                  }
                </select>

                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
              参加ユーザー
              </label>
              <div className='flex gap-5 justify-between w-full p-2'>
                <select
                  id='invite'
                  value={invite}
                  onChange={(e)=>setInvite(e.target.value)}
                  className="w-3/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value={""} disabled></option>
                  {
                    users?.map((item:any,index:number)=>(
                      !invite_users.includes(item.username) &&
                      <option key={index} value={item.username} >{item.username}</option>
                    ))
                  }
                </select>
                <div  
                  onClick={()=>create()}
                className="w-2/5 inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >追加</div>
              </div>
              <div className="relative bg-white dark:bg-form-input">
                <textarea
                  rows={6}
                value={invite_users.join('\n')}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>     
              </div>
            </div>
            <div
              onClick={()=>update()}
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              追 加
            </div>
            <p className='h-2'>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
