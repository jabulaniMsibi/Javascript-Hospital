// patient profile

var stuff = {
    patient_id:1,
    contactDetails:{},
    appointements:[
      {
        hostpital_id:1,
        doctor_id:3
      }
    ],
    tasks:[]
  }


// doctor profile 
var doctorProfile = {
    doctor_id:1,
    specialities:[
      "nueroscience"
    ],
    tasks:[],
    appointements:[
      {
        userId:1,
        details:{
          symtons:[]
        }
      }
    ]
  }

  

//   hospital profile 

var hospital = {
    id:1,
    name:"summerset",
    address:"",
    doctors:[
      {
        id:1,
        name:"luke"
      },
      {
        name:"paul"
      }
    ]
  }


//   tasks profile 
var tasks = [
  {
    doctor_id:1,
    patient_id:null,
    name:"consult children"
  },
  {
    doctor_id:null,
    patient_id:1,
    name:"consult children"
  }
]


localStorage.setItem('patient profile', JSON.stringify(stuff));  
localStorage.setItem('doctor profile', JSON.stringify(doctorProfile));
localStorage.setItem('tasks list', JSON.stringify(tasks));
localStorage.setItem('hospital profile', JSON.stringify(hospital));