// import React, { useState } from 'react';

// const ModalContext = React.createContext({
//     isModalShown:false,
//     openModal:()=>{},
//     closeModal:()=>{}
// })

// export const ModalContextProvider = (props) => {
//     const [isModalShown, setIsModalShown] = useState(false);

//     const showModalHandler = () => {
//         setIsModalShown(true);
//     }

//     const hideModalHandler = () => {
//         setIsModalShown(false);
//     }

//     return <ModalContext.Provider value={{
//         isModalShown:isModalShown,
//         openModal:showModalHandler,
//         closeModal:hideModalHandler
//     }}>
//         {props.children}
//     </ModalContext.Provider>
// }

// export default ModalContext