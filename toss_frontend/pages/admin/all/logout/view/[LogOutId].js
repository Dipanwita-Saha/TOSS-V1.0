import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import AdminDashboardLayoutHeader from "@/pages/component/admin_component/admin_dashboard_layout_header";
import AdminDashboardLayoutMenu from "@/pages/component/admin_component/admin_dashboard_layout_menu";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import adminpagestyles from '../../../../../styles/admin_style/admin_viewprofile_style.module.css'


import api from "@/pages/api";
import { faCross, faEraser, faUnlockKeyhole, faUserPen, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ViewAllLogOutByAdmin({data,logOutId}) {
    const router = useRouter();


    const deleteLogoutHistory = async (e)=>{
      e.preventDefault();
      const response = await api.delete('/admin/deletelogoutbyid/'+logOutId.LogOutId);
  
        router.back();
    
    }






    return (

    <>
<div className="sm:ml-64">

{/* ------------------   Header   --------------- */}

  <AdminDashboardLayoutHeader  Title="Log Out Details" userdata={data} Uname={data.Uname} ProfilePicture={data.ProfilePicture}></AdminDashboardLayoutHeader>

{/* ------------------   Header   --------------- */}




{/* ------------------   Content   --------------- */}
<div  className={[`w-full m-8 p-items-center relative z-0 mb-6 group`, 
       adminpagestyles.owner_profile_main].join(' ')}>
 <div className="grid grid-cols-1 p-10 pr-4 sm:grid-cols-3">
  <div></div>
<label className={[`relative z-0 w-full text-sm `, 
       adminpagestyles.owner_heading_label].join(' ')}>{logOutId.Uname}'s Log Out History</label>
<div></div>
</div>

<div className="grid grid-cols-1 gap-3 p-10 pr-4 sm:grid-cols-2">

    <div className="m-3 pt-5 ml-2">

    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
       adminpagestyles.owner_profile_lebel].join(' ')} > Log Out ID
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       adminpagestyles.owner_profile_data].join(' ')} 
       >{logOutId.LogOutId}
    </p>
    </div>

    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full`, 
       adminpagestyles.owner_profile_lebel].join(' ')} > User Name
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       adminpagestyles.owner_profile_data].join(' ')} 
      >{logOutId.Uname}
    </p>
    </div>

      </div>

    <div className="m-3 pt-5 ml-2">
    <div className="pt-3">

    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
      adminpagestyles.owner_profile_lebel].join(' ')} > Time of Log Out
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
      adminpagestyles.owner_profile_data].join(' ')} 
      >{logOutId.Time}
    </p>
    </div>
    <div className="pt-3">

    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
      adminpagestyles.owner_profile_lebel].join(' ')} > Device IP
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
      adminpagestyles.owner_profile_data].join(' ')} 
      >{logOutId.IP}
    </p>
    </div>

    </div>



</div>
<div className="grid grid-cols-3 justify-center gap-3 pb-10 pl-4">
  
  <div></div>
  <div className="m-3 pt-0 ml-2">

  <div className="m-3 pt-0 ml-2">
  <button onClick={deleteLogoutHistory} className={[` items-center justify-center pt-2.5 pb-2.5 pl-10 pr-10 mt-4  w-full max-w-xs font-medium`, 
       adminpagestyles.profile_bottom_button_area].join(' ')}  type="submit" >Delete Logout Info <FontAwesomeIcon icon={faUnlockKeyhole} className={adminpagestyles.profile_icon}/> </button>
  </div>  
  </div>
  <div></div>
  

</div>

</div>




{/* ------------------   Content   --------------- */}

</div>


{/* -----------------   MainMenu  -------------- */}
  <AdminDashboardLayoutMenu  Uname={data.Uname} ProfilePicture={data.ProfilePicture}></AdminDashboardLayoutMenu>

{/* -----------------   MainMenu  -------------- */}    </>
  )
}

export async function getServerSideProps(context) {

  const tossSession  = context.query;

  //console.log(Uname.data);
var data="";
const response_admin = await api.get('/admin/viewprofile/'+tossSession.Uname)
.then(response_admin => {
  // handle the response
  data =  response_admin.data;

}).catch(error => {
  // handle the error
});


  var logOutId="";
  const LogOutId=context.query.LogOutId;
  const response = await api.get('/admin/viewlogoutbylogoutid/'+LogOutId);
  logOutId = await response.data;

return { props: { data,logOutId } }

}
