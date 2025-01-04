import { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux"; 
import { deleteTodo, toggleTodo, updateTodo } from "../../store/todoSlice";



const itemClassName = `
    flex items-center h-[65px] gap-[12px] px-[12px] py-[0px]
`;

const checkboxClassName = `w-[16px] h-[16px]`;

const textClassName = `grow`;

const buttonClassName = `
    w-[30px], h-[30px] bg-black text-white  border-[1px] border-solid border-gray-100
    p-[3px]
`;

const inputClassName = `
    grow border-[1px] border-solid border-gray-100 rounded-[6px]
    bg-transparent px-[10px] py-[4px] text-[16px] leading-20px text-white
 `


function TodoItem({ id, text, completed }) {
    const dispatch = useDispatch(); 
    const [newText, setNewText] = useState(text);   
    const [edit, setEdit] = useState(false);
    // 수정 
    const handleEdit = () => {
        if(edit){
            dispatch(updateTodo({ id, text: newText}));
        }
        
        setEdit((prev) => !prev);
    }
    
    // 기존 내용 수정 버튼 
    const handleChange = (e) => {
        setNewText(e.target.value);
    };

    // 한개 체크박스 선택
    const handleToggle = () => {
        dispatch(toggleTodo(id));      
    }

    // 삭제 
    const handleDelete = () => {
        dispatch(deleteTodo(id));      
    }   


    return(
            <div className={itemClassName}>
                <input className={checkboxClassName}
                    type="checkbox" 
                    checked={completed}
                    onChange={handleToggle}
                />
                {
                    edit ? (
                        <input className={inputClassName}  value={newText} onChange={handleChange}/>
                    ) : (
                        <p className={[textClassName, completed && "line-through"].join(" ")} 
                           data-completed={completed}
                        >
                            {newText}
                        </p>
                        )
                }
              
                <button className={buttonClassName} onClick={handleEdit}>수정</button>
                <button className={buttonClassName} onClick={handleDelete}>삭제</button>
            </div>
            
    ) 
}

const Item = styled.div`
    display: flex;
    align-items: center;
    height: 65px;
    gap: 12px;
    padding: 0 12px;
`;
const Checkbox = styled.input`
    width: 16px;
    height: 16px;
`;
const Input = styled.input`
    flex-grow: 1;
    border: 1px solid gray;
    border-radius: 6px;
    background-color: transparent;
    padding: 4px 12px;
    font-size: 16px;
    line-height: 20px;
    color: white;
`;
const Text = styled.p`
    flex-grow: 1;
    ${(props) => props.completed && ` text-decoration: line-through;`}
`;
const Button = styled.button`
    width: 40px;
    height: 30px;
    background-color: black;
    color: white;
    border: 1px solid  white;
`;


export default TodoItem;