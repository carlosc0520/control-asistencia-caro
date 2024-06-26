import React from 'react';

const CustomLoader = () => {
    return (
        <div>
            <div className="spinner-box">
                <div className="pulse-container">
                    <div className="pulse-bubble pulse-bubble-1"></div>
                    <div className="pulse-bubble pulse-bubble-2"></div>
                    <div className="pulse-bubble pulse-bubble-3"></div>
                </div>
            </div>
            <div className='flex justify-center m-auto mb-4 -mt-7'>
                <h3 className='poppins text-sm text-gray-500 font-medium'>Cargando data, espere un momento.</h3>
            </div>
        </div>
    )
}

export default CustomLoader;