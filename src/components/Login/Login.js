import React, { useReducer, useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/authentication-context';

import './Login.css';

const emailReducer = (prevState,action) => {
    if(action.type === "USER_EMAIL"){
        return {
            value:action.val,
            isValid:/^\S+@\S+$/g.test(action.val)
        }
    }
}

const passwordReducer = (prevState,action) => {
    if(action.type === "USER_PASSWORD"){
        return {
            value:action.val,
            isValid:action.val.length > 7
        }
    }
}

const Login = props => {

    const [ isformValid , setFormValidty ] = useState(false);

    const [ enteredEmail , dispatchEnteredEmail ] = useReducer(emailReducer,{
        value:'',
        isValid:undefined
    });

    const [ enteredPassword , dispatchEnteredPassword ] = useReducer(passwordReducer,{
        value:'',
        isValid:undefined
    })

    const passwordDependencise = enteredPassword.isValid;
    const emailDependencies = enteredEmail.isValid;

    useEffect(()=>{
        let timer = setTimeout(()=>{
            setFormValidty((prevState)=>{
                return (enteredEmail.isValid && enteredPassword.isValid)
            })
        },500);

        return ()=>{clearInterval(timer)}
    },[emailDependencies,passwordDependencise])

    const ctx = useContext(AuthContext)

    const emailChangeHandler = event => {
        dispatchEnteredEmail({
            type:"USER_EMAIL",
            val:event.target.value
        })
    }

    const passwordChangeHandler = event => {
        dispatchEnteredPassword({
            type:"USER_PASSWORD",
            val:event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault()
        // console.log(enteredEmail,enteredPassword);
        ctx.Login(enteredEmail);
    }

    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className="control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={emailChangeHandler} value={enteredEmail.value}/>
                </div>
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={passwordChangeHandler} value={enteredPassword.value}/>
                </div>
                <div className="actions">
                    <Button type="submit" className='button' disabled={!isformValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
};

export default Login