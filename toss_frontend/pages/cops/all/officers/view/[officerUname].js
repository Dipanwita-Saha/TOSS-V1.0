import { useRouter } from 'next/router'
import api from "@/pages/api";
import DashboardLayoutHeader from "../../../../component/cops_component/cops_dashboard_layout_header";
import DashboardLayoutMenu from "../../../../component/cops_component/cops_dashboard_layout_menu";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ownerpagestyles from '../../../../../styles/cops_style/cops_viewprofile_style.module.css'


export default function ViewAllOfficerByCops({data, officerdata}) {
    const router = useRouter();
    return (

    <>
<div className="sm:ml-64">

{/* ------------------   Header   --------------- */}

  <DashboardLayoutHeader Title="View Officer" userdata={data}  Uname={data.Uname} ProfilePicture={data.ProfilePicture}></DashboardLayoutHeader>

{/* ------------------   Header   --------------- */}




{/* ------------------   Content   --------------- */}
<div  className={[`w-full m-8 p-items-center relative z-0 mb-6 group`, 
       ownerpagestyles.owner_profile_main].join(' ')}>

<div className="grid grid-cols-1 p-10 pr-4 sm:grid-cols-3">
  <div></div>
<label className={[`relative z-0 w-full text-sm `, 
       ownerpagestyles.owner_heading_label].join(' ')}>{officerdata.Uname}'s Information</label>
<div></div>
</div>

<div className="grid grid-cols-1 gap-3 p-10 pr-4 sm:grid-cols-3">

    <div className="m-3 pt-5 ml-2">

    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
       ownerpagestyles.owner_profile_lebel].join(' ')} > First Name
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       ownerpagestyles.owner_profile_data].join(' ')} 
       >{officerdata.FirstName}
    </p>
    </div>

    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full`, 
       ownerpagestyles.owner_profile_lebel].join(' ')} > Email
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.Email}
    </p>
    </div>
    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full`, 
       ownerpagestyles.owner_profile_lebel].join(' ')} > Gender
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.Gender}
    </p>
    </div>

    <div className="pt-3">
    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full`, 
       ownerpagestyles.owner_profile_lebel].join(' ')} > Designation
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
       ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.Designation}
    </p>
    </div>

      </div>

    <div className="m-3 pt-5 ml-2">
    <div className="pt-3">

    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
      ownerpagestyles.owner_profile_lebel].join(' ')} > Last Name
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
      ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.LastName}
    </p>
    </div>
    <div className="pt-3">

    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
      ownerpagestyles.owner_profile_lebel].join(' ')} > Phone No.
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
      ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.MobileNo}
    </p>
    </div>
    <div className="pt-3">

    <p  className={[` pb-2.5 pt-4 py-2.5 px-0 text-sm w-full `, 
      ownerpagestyles.owner_profile_lebel].join(' ')} > Account Number.
    </p>
    <p className={[` pb-1.5 pt-1.5 w-full`, 
      ownerpagestyles.owner_profile_data].join(' ')} 
      >{officerdata.AccountNo}
    </p>
    </div>




    </div>

    <div className={[`m-2 pl-2 p-items-center relative`, 
       ownerpagestyles.owner_profile_section].join(' ')} >
    
      <Image height="100" width="100" className={[`m-4  max-w-xs h-auto max-h-xs `, 
       ownerpagestyles.owner_profile_img].join(' ')} src={"http:/localhost:3000/officer/getimage/"+officerdata.ProfilePicture} alt={officerdata.ProfilePicture} />    
      
    </div>

</div>





</div>




{/* ------------------   Content   --------------- */}

</div>


{/* -----------------   MainMenu  -------------- */}
  <DashboardLayoutMenu Uname={data.Uname} ProfilePicture={data.ProfilePicture}></DashboardLayoutMenu>

{/* -----------------   MainMenu  -------------- */}




    </>
  )
}

export async function getServerSideProps(context) {
    
  
  const tossSession  = context.query;

  //console.log(Uname.data);
var data="";
const response_officer = await api.get('/cops/viewprofile/'+tossSession.Uname)
.then(response_officer => {
  // handle the response
  data =  response_officer.data;

}).catch(error => {
  // handle the error
});


  var officerdata="";
  const officerUname=context.query.officerUname;
  const response = await api.get('/cops/viewofficerbyuname/'+officerUname);
  officerdata = await response.data;

return { props: { data,officerdata } }
}
