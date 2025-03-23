import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';



function App() {
  // 驗證是否登入，狀態是否發生變化，初始值是false
  const [isAuth, setIsAuth] = useState(false)
  

  return (
    <>
      {
        isAuth ? <ProductPage setIsAuth={setIsAuth} /> : <LoginPage setIsAuth={setIsAuth} /> 
      }
      
    </>
  )
}

export default App


