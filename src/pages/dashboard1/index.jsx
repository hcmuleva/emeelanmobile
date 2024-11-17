import React from 'react'
import UserDashboard from '../UserDashboard';
import CenterDashBoard from './CenterDashboard';
import AdminDashboard from '../AdminDashboard';
import Header from '../Header';

export default function Dashboard() {
//   const [role, setRole] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
  
  const emeelanrole=localStorage.getItem("emeelanrole")
  
//   React.useEffect(() => {
//     (async () => {
//         const user = await authProvider.getUserIdentity();
//         setRole(user?.emeelanrole);
//         console.log("user",user)
//         setLoading(false);

//     })();
// }, []);

// if (loading) {
//     return <div>Loading...</div>;
// }

switch(emeelanrole){
    case "MEELAN":
       return ( <>
        <Header/>
        <UserDashboard/>
        </>)
    case "CENTER":
        return <> <Header/><UserDashboard/></>
    case "ADMIN":
        return  <> <Header/><UserDashboard/></>
}

}
