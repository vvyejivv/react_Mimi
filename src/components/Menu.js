import './Menu.css'
function Menu(props){
    return <div className='menu'>
                <div className='menu-title'>{props.title}</div>
                <div className='menu-content'>{props.content}</div>
            </div>
}
export default Menu;