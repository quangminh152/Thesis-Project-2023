import React from 'react'

type ToggleSwitchType = {
    onClick: () => Promise<void>
    isComplete: boolean | undefined
    titleSwitch: string
}
function ToggleSwitch({ onClick, isComplete, titleSwitch }: ToggleSwitchType) {
    return (
        <div className="relative justify-center flex flex-col overflow-hidden">
            <div className="content-center">
                <label className="inline-flex relative items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isComplete}
                        readOnly
                    />
                    <div
                        onClick={onClick}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        {titleSwitch}
                    </span>
                </label>
            </div>
        </div>
    )
}

export default ToggleSwitch