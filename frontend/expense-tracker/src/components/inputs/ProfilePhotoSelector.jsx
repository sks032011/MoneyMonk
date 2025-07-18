import React, { useRef, useState } from 'react'
import {LuUser,LuUpload,LuTrash } from "react-icons/lu"
const ProfilePhotoSelector = ({image,setImage}) => {
  const inputRef=useRef(null); // Create a ref to the input element
  const [previewUrl,setPreviewUrl]=useState(null);
 
  const handleImgChange=(e)=>{
    const file=e.target.files[0]; //files [0] is the first file selected from the array of files....get the selected file frm the evnt
    if(file){
        //update img state 
        setImage(file);
        //update preview url state
        
        setPreviewUrl(URL.createObjectURL(file) );
    }
  }

  const handleRemoveImg=()=>{
    setImage(null);
    setPreviewUrl(null);
  }

  const onChoosefile=()=>{
    inputRef.current.click(); // it will trigger the click event on the input element..click() will open the file dialog box
  }

  return <div className='flex justify-center ml-[70%] md:mb-6'>
      <input type="file"
      accept='image/*' //jpeg svg or ...
      ref={inputRef}
      onChange={handleImgChange}
      className='hidden' //else it will show "no file selected"
      />

      {!image ?(
        <div className='w-15 md:w-20 h-15 md:h-20 bg-blue-300 rounded-full   flex justify-center items-center relative '>
            <LuUser className='text-3xl text-blue-950'/>
            <button
            type='button'
            className='w-8 h-9 flex items-center justify-center bg-blue-950 rounded-full -bottom-4 -right-2 md:-bottom-1 md:-right-1 cursor-pointer absolute text-blue-300'
            onClick={onChoosefile}
            >
                <LuUpload/>
            </button>
        </div>
      ):(
        <div className='relative'>
        <img src={previewUrl} 
        alt="pfp"
        className=' w-15 md:w-20 h-15 md:h-20 object-cover rounded-full '
        />
  
        <button 
        type='button'
        className='w-8 h-9 flex items-center justify-center bg-blue-950 rounded-full -bottom-4 -right-2 md:-bottom-1 md:-right-1 cursor-pointer absolute text-blue-300'
        onClick={handleRemoveImg}
        >
            <LuTrash/>
        </button>

        </div>
      )

      }

    </div>
  
}

export default ProfilePhotoSelector


// The file selection dialog is opened by simulating a click on the file input element.
// The user selects a file and the file selection dialog is closed.
// The file input element's value property is updated to reflect the selected file.
// The handleImgChange function is called and the target property is set to the file input element.
// The target property is used to access the selected file, which is stored in the files property of the file input element.