
const clockOut = async() =>{
    let result;
    const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/users/user/clockOut`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    if(response.status === 200){
      result = true
    } else {
    
      result = response.json()
    }
  
    return result;
  }
  
  export {clockOut}