"use client"

 interface MenuItemsProps{
    onClick : ()=> void;
    label:string
 }

const MenuItems:React.FC<MenuItemsProps> = ({onClick,label}) => {
  return (
    <div onClick={onClick} className="font-semibold py-3 px-4 hover:bg-neutral-100 transition">
        {label}
    </div>
  )
}

export default MenuItems