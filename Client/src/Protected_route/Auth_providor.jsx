import { Children, createContext, useContext, useEffect, useState } from "react"

const authContext = createContext()

function Auth_providor() {
    const [isAuthenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthenticate(!!token)
    }, []);
  return (
    <authContext.Provider value={{ isAuthenticate, setAuthenticate }}>
        {Children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)