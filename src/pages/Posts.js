import { useState, useEffect } from "react";
import Menu from '../components/Menu';
function Posts() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);
    const [userName, setUserName] = useState("");
    // useEffect(() => {
    //     async function fetchList() {
    //         try {
    //             const response = await fetch(`http://localhost:4000/postList.dox?userId=${userId}`);
    //             const jsonData = await response.json();
    //             setPostList(jsonData);
    //             setUserName(jsonData[0].USERID);
    //             console.log(jsonData);
    //         } catch (error) {
    //             console.error("!!error!!");
    //         }
    //     }
    //     fetchList();
    // }, []);

    return <div>
        
       
    </div>
}
export default Posts;