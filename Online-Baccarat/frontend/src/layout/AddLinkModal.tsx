// AddLinkModal.tsx
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

interface AddLinkModalProps {
  show: boolean;
  onClose: () => void;
  onAddLink: (title:string, link:string) => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ show, onClose, onAddLink }) => {
  const [link, setLink] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  if (!show) {
    return null;
  }

  const handleAddLink = () => {
    if (title !== "" && link !== "") {
      onAddLink(title, link);
    }
    setTitle("");
    setLink("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex w-screen h-screen z-9999 flex-col duration-300 dark:bg-boxdark"
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] md:w-1/4 h-[30%] md:h-1/3 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={onClose} className='w-8 h-8 text-black dark:text-white hover:text-primary'>
            <IoMdClose className='w-full h-full' />
          </button>
        </div>
        <div className="px-6.5">
          <h3 className="font-bold text-center text-black dark:text-white mb-4">リンクを追加</h3>
          <p>タイトル</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Zoomミーティング"
          />
          <p className='mt-2'>リンク</p>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="https://sample.com"
          />
          <button
            onClick={handleAddLink}
            className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-4 text-center font-bold text-white hover:bg-opacity-90"
          >
            追 加
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;
