import React from 'react'
//???????????????????????????????????????????????????

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;
    return <div className='fixed top-0 right-0 left-0 z-52 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50  '>

        <div className='relative p-4 w-full max-w-2xl max-h-full '>

            {/* Modal content  */}
            <div className='relative bg-gray-400 rounded-lg shadow-sm '>

                {/* modal head  */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-500 border-gray-200'>

                    <h3 className='text-lg font-medium text-gray-900 '>
                        {title}
                    </h3>

                    <button
                        type='button'
                        className=' text-blue-950 bg-blue-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-blue-400  cursor-pointer'
                        onClick={onClose}
                    >
                        X
                    </button>

                </div>

                {/* modal body  */}

                <div className="p-4 md:p-5 space-y-4">
                    {children}
                </div>

            </div>


        </div>

    </div>

};


export default Modal
