import  "./grocery-bud.css"
import {useEffect, useRef, useState} from "react";

const groceryBud = ()=> {

    const [items,setItems]=useState( JSON.parse(localStorage.getItem('localItems')) || [] )
    const [actions,setActions] =useState( JSON.parse(localStorage.getItem('localActions'))||{})
    const inpFiled = useRef()
    const [check,setCheck] = useState(false)
    const randomID = new Date()
    const getItem = (e) => {
        e.preventDefault()
        const target = e.target
        const formData = new FormData(target)
        const formArr = Array.from(formData.entries())
        const formObject = Object.fromEntries(formArr)
        const grocery = formObject.text
        if (formObject.text === ''){
            setCheck(true)
        }
        else {
            setItems([...items,{text:grocery,id:randomID}])
            inpFiled.current.value = ''
            setCheck(false)
        }
    }
    const handlerCheck = (id) => {
        if (actions[id] === true ){
            setActions({...actions,[id]:false})
        }
        else {
            setActions({...actions,[id]:true})
        }
    }
    useEffect(()=>{
        localStorage.setItem('localItems',JSON.stringify(items))
        localStorage.setItem('localActions',JSON.stringify(actions))
    },[items,actions])

    const deleteItem = (id) => {
        setItems(items.filter((item)=> item.id !== id ))
    }
    return <>
        <section>
            <h1 className={'title'}>Grocery Bud</h1>
                <form onSubmit={(e)=>getItem(e)}>
            <input ref={inpFiled} type={'text'} name={'text'} className={'item'} placeholder={ check ? 'value required': ''}/>
            <button type={"submit"} className={'add-btn'}>Add item</button>
        </form>
        <article>
            {
                items.map((item) => {
                    const {text, id} = item
                    return <>
                        <div key={id} className={'itemsBlock'}>
                            <input type={"checkbox"} checked={actions[id]} onClick={() => handlerCheck(id)}/>
                            <p>{actions[id] ? <s>{text}</s> : text}</p>
                            <button type={"button"} onClick={() => deleteItem(id)}>Delete</button>
                        </div>
                    </>
                })
            }
        </article>

        </section>
    </>
}
export default groceryBud