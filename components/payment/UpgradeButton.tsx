import React from 'react'
import { Button } from '../ui/button'

const UpgradeButton = () => {
    return (
        <div>
            <Button
                className="rounded-4xl bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-sm font-medium px-7 py-2.5 transition-colors" >
                Upgrade
            </Button>
        </div>
    )
}

export default UpgradeButton