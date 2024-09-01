import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineSaveAs } from "react-icons/md";

const AddWiki: React.FC = () => {
  const navigate = useNavigate();
  const Id = useParams().channelId;

  const [content, setContent] = useState('');
  // const defaultContent = "<p>This is the default content</p>";

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: {
        container: [
          [{ 'header': '1'}, { 'header': '2'}, { 'header': [3, 4, 5, 6] }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
          
            input.onchange = async () => {
              const file = input.files ? input.files[0] : null;
          
              if (file) {
                const formData = new FormData();
                formData.append("image", file);
          
                try {
                  const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });
          
                  if (response.ok) {
                    const { imageUrl } = await response.json();
                    
                    if (quill) {
                      const range = quill.getSelection(true); // Use true to maintain selection
                      quill.insertEmbed(range.index, "image", imageUrl);
                    }
                  } else {
                    alert("Failed to upload image");
                  }
                } catch (error) {
                  console.error("Error uploading image:", error);
                  alert("An error occurred while uploading the image.");
                }
              } else {
                alert("No file selected.");
              }
            };
          },
        },
      },
    },
    formats: [
      'header', 'font',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'color', 'background'
    ]
  });

  // useEffect(() => {
  //   if (quill) {
  //     quill.clipboard.dangerouslyPasteHTML(defaultContent);
  //   }
  // }, [quill]);

  const handleSubmit = () => {
    if (quill) {
      const content = quill.root.innerHTML;
      setContent(content);
    }
  };
  
  return (
    <div className="flex flex-col xl:h-[800px] md:h-[710px] w-full rounded-md py-10 mx-1 overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 shadow-md">
      <div className="w-full xl:px-20 2xl:px-40 md:px-5">
        <div ref={quillRef} />
      </div>
      
      <div className='w-full flex justify-center px-3 mt-20'>
        <Link
          to={"/channel/wiki/"+Id}
          className="inline-flex items-center justify-center rounded-md border border-success py-2 px-20 mx-5 text-center font-medium text-success hover:bg-opacity-90 lg:px-8 xl:px-20"
        >
          <MdArrowBackIosNew className='mr-2'/>
          戻る
        </Link>
        <button
        onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-md bg-success py-2 px-20 mx-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-20"
        >
          <MdOutlineSaveAs className='mr-2' />
          保存
        </button>
      </div>
    </div>
  );
};

export default AddWiki;
