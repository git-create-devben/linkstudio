import React from 'react'
import { Button } from '../ui/button'

const UpgradeButton = () => {
    return (
        <div>
            <Button
            onClick={() => window.location.href = '/payment'}
                className="rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs font-medium px-4  transition-colors duration-200" >
                Upgrade
            </Button>
        </div>
    )
}

export default UpgradeButton