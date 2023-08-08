import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
	Menu,
	MenuList,
	MenuButton,
	MenuItem,
} from "@reach/menu-button"
import "@reach/menu-button/styles.css"

export default function DropdownData({nombre, datosDisponibles}) {
    const navigate = useNavigate()

    function goToData(path) {
        navigate('/' + path)
    }

    return ( 
        <div className='relative'>
            <Menu>
                <MenuButton>
                    <div className='flex items-center'>
                        <div>{nombre}</div>
                        <img className='w-2 h-2 ml-1 mr-2 sm:ml-2 sm:mr-0' src={require('../../../assets/dropdownIcon.png')} />
                    </div>
                </MenuButton>

                <MenuList>
                    {datosDisponibles.map(dato => (
                        <MenuItem onSelect={() => {goToData(dato.path)}}>
                            <span className='text-lg'>{dato.nombre}</span>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
  )
}
