import { useState, useRef } from 'react';

import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

  const inputAmountRef = useRef();
  const [isValid, setIsValid] = useState(false);

  const submitFormHandler = event => {
    event.preventDefault();
    const entereredAmout = inputAmountRef.current.value;
    const entereredAmoutNUmber = +entereredAmout;

    if(entereredAmout.trim().length === 0 || entereredAmoutNUmber > 5 || entereredAmoutNUmber < 0){
      setIsValid(true)
      return 
    }

    props.onAddToCartHandler(entereredAmoutNUmber);
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        ref={inputAmountRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type="submit">+ Add</button>
      {isValid && <p>Please enter the correct value (1-5)</p>}
    </form>
  );
};

export default MealItemForm;