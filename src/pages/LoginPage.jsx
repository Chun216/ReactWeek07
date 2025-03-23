import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage({ getProducts, setIsAuth }) {
    const [account, setAccount] = useState({
      username:'',
      password:''
    });
    
    // 帳號輸入後改變的方法
    const handleInputChange = (e) => {
      const { value, name } = e.target
      setAccount({
        ...account,
        [name]: value
      })
    }

    // 剛剛在App元件內，handleLogin比較暗，代表在那用不到，可以整個移過來
    const handleLogin = (e) => {
      e.preventDefault()
      axios.post(`${BASE_URL}/v2/admin/signin`, account)
           // .then((res) => console.log(res)) 用來驗證
           // 當登入成功，狀態轉為true
           .then((res) => {
             // 把token與到期日從資料中解構出來
             const { token, expired } = res.data;
             // console.log(token, expired) 確認是否成功存取
             // 存取在cookie中
             document.cookie = `chunToken=${token}; expires=${new Date(expired).toUTCString()}`;
             axios.defaults.headers.common['Authorization'] = token;
             setIsAuth(true)
            //  getProducts();
           })
           .catch((error) => alert('登入失敗'))
    }

    {/*檢查是否登入*/}
    const checkLogin = async() => {
      try {
        const res = await axios.post(`${BASE_URL}/v2/api/user/check`);
        getProducts();
        setIsAuth(true);

      } catch (error) {
        console.log(error)
      }
    }
    {/*初始化後才檢查是否登入，取得、夾帶token*/}
    useEffect (() => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)chunToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        // console.log(token);  確認是否有存取成功
        axios.defaults.headers.common['Authorization'] = token;
      checkLogin();
    }, [])

    return (<div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input name="username" value={account.username} onChange={handleInputChange} type="email" className="form-control" id="username" placeholder="name@example.com" />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input name="password" value={account.password} onChange={handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>)
}

export default LoginPage