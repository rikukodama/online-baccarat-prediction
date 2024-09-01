import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from "axios";
import { createchannel } from "../redux/channelSlice";
interface AddChannelProps {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
}

const AddChannel = ({ modalVisible, setModalVisible }: AddChannelProps) => {
  const { user, users } = useSelector((store: RootState) => store.user);
  
  const [name, setName] = useState("");
  const [invite_user, setInvite] = useState([]);
  const [invite_users, setInvites] = useState([]);
  const [invite, setUser] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(errorMessage);
    if (!loading) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage, loading]);

  useEffect(() => {
    if (loading) {
      setErrorMessage("Loading...");
    }
  }, [loading]);
  const dispatch=useDispatch();
  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "")
      return setErrorMessage("Channel name is required!");
    if (invite_user == null)
      return setErrorMessage("Username is required!");
    setLoading(true);
    const res = await dispatch(createchannel({name:name, create_user:user._id, invite_users:invite_users}));
    setErrorMessage(res.payload.message);
        setLoading(false);
        setName("");
        setInvite([]);
        setInvites([]);
        setUser("");
  };
  const create = () =>{
    if(invite) {
      setInvite((c)=>([...c, invite]));
      setInvites((c)=>[...c,users.filter((item:any)=>{return item.username==invite})[0]._id]);
    }
    setUser("");
  }
  return (
    <div
      className={`fixed inset-0 flex w-screen h-screen z-9999 flex-col duration-300 dark:bg-boxdark ${modalVisible ? 'block' : 'hidden'}`}
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] md:w-1/3 h-[80%] md:h-2/3 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={() => setModalVisible(false)} className='w-8 h-8 text-black dark:text-white hover:text-primary'><IoMdClose className='w-full h-full' /></button>
        </div>
        <div>
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-center text-black dark:text-white">
              新規チャンネルを追加する
            </h3>
          </div>
          <form className="flex flex-col gap-5.5 p-6.5"
            onSubmit={onsubmit}
          >
            <div>
              <label className="mb-3 block text-black dark:text-white">
              チャンネル名
              </label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                id="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
              参加ユーザー
              </label>

              <div className='flex gap-5 justify-between w-full p-2'>
                <select
                  id='invite'
                  value={invite}
                  onChange={(e)=>setUser(e.target.value)}
                  className="w-3/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value={""} disabled></option>
                  {
                    users?.map((item:any,index:number)=>(
                      !invite_user.includes(item.username) &&
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
                rows={5}
                readOnly
                id='invite'
                value={invite_user.join('\n')}
                placeholder="Default textarea"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
              </div>
            </div>
            <p className='h-2'>{errorMessage}</p>
            <button
              type='submit'
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              作 成
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
