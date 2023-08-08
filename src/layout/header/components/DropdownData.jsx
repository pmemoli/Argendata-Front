import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
	Menu,
	MenuList,
	MenuButton,
	MenuItem,
} from "@reach/menu-button"
import "@reach/menu-button/styles.css"

export default function DropdownData({nombre, options}) {
    const navigate = useNavigate()

    function goToData(path) {
        navigate('/' + path)
    }

    return ( 
        <div className='relative'>
            <Menu>
                <MenuButton>
                    {nombre} <span aria-hidden>▾</span>
                </MenuButton>

                <MenuList>
                    {options.map(option => (
                        <MenuItem onSelect={() => {goToData(option.path)}}>
                            <span className='text-lg'>{option.nombre}</span>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
  )
}
