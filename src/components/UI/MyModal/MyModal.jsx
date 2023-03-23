import React from 'react'
import classes from './MyModal.module.css'
import MyButton from '../button/MyButton'

const MyModal = ({children, visible, setVisible}) => {
  
 const rootClasses = [classes.myModal]

 if (visible) {
    rootClasses.push(classes.active);
 }
  
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={classes.myModalContent} onClick={(e)=> e.stopPropagation()}>      
        <MyButton onClick={() => setVisible(false)}>
          Закрыть Х
        </MyButton>
        {children}
      </div>
    </div>
  )
}

export default MyModal