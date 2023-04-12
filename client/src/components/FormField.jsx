import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, randomPrompt, handleRandomPrompt}) =>
{
    return (
        <div>
            <div className='flex items-center gap-2 mb-2'>
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-onbackground"
                >
                    {LabelName}
                </label>
                {randomPrompt && (
                    <button
                        type="button"
                        onClick={handleRandomPrompt}
                        className="text-onprimary text-xs bg-primary py-1 px-2 rounded-[5px]"
                    >
                        Random
                    </button>
                )}
            </div>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
                className="text-3xl rounded-md w-full"
            />
        </div>
    )
}

export default FormField