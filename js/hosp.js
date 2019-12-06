// ------------------------  ON LOAD OF THE WINDOW OBJECT  ------------------------
window.addEventListener('DOMContentLoaded', function () {
     // LOAD THE TEMPLATE DOCTORS FROM LOCAL STORAGE
     loadTemplateDoctors();

     // LOAD THE TEMPLATE PATIENTS FROM LOCAL STORAGE
     loadTemplatePatients();

     // SUBMIT FUNCTION OF REGISTER FORM
     RegisterBtn.addEventListener('click', RegisterUser);

     // SUBMIT FUNCTION OF SIGN IN FORM
     signInBtn.addEventListener('click', signUserIn);
});


// ------------------------ SIGN UP FORM VALIDATION ------------------------
const signInForm = document.querySelector('.sign-in');
const signInEmail = document.querySelector('.sign-in-email');
const signInPassword = document.querySelector('.sign-in-password');
const signInUserRole = document.querySelector('.sign-in-user-role');
const signInSelect = document.querySelector('.user-role');
const signInBtn = document.querySelector('.sign-in-button');

document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});

function signUserIn() {
     let selectedIndex = signInSelect.selectedIndex; 
     let userRole = signInSelect[selectedIndex].value;
     let email = signInEmail.value.toLowerCase();
     let password = signInPassword.value.toLowerCase();
     let errors = [];
     let localPatients = JSON.parse(localStorage.getItem('patients'));
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let index; 

     let emailExist = true;
     let passwordExist = true;
     let userRoleExist = true;

     
     //CHECK IF ALL THE INPUTS ARE VALID
     if(email == '')
     {
          errors.push('email is required, please fill it');
     }
     if(password == '')
     {
          errors.push('password field is required, please fill it');
     }

     //IF THERE ARE THEN DISPLAY THE ERRORS
     if(errors.length > 0) {
          let errorsList = document.querySelector('.errors-ul');

          //FOR EACH ERROR IN THE ERRORS ARRAY, ADD A LIST ITEM WITH THE ERROR
          errors.forEach(function(error) {
               errorsList.innerHTML += `<li> ${error} </li> `; 
          })
     } else {
          if(userRole == 'patient') {
               if(localStorage.getItem('patients') == null) {
                    localPatients = [];
               } else {
                    let localPatients = JSON.parse(localStorage.getItem('patients'));
               }
     
               // CHECK IF THERE ARE ANY ERRORS IN THE SIGN IN PROCESS    
               localPatients.forEach(function(patient) {
                    if(email != patient.email)
                    {
                         emailExist = false;
                    }
                    if(password != patient.password)
                    {
                         passwordExist = false;
                    }
                    if(userRole != patient.userRole)
                    {
                         userRoleExist = false;
                    }       
               })
     
               // FIND THE INDEX OF THE USER
               for(let i = 0; i < localPatients.length; i++) {
                    if(email == localPatients[i].email) {
                         index = i;
                    }
               }
                        
               let toBeEncoded = localPatients[index].userId;
               let endcoded = encodeURIComponent(toBeEncoded);

               window.location.href = 'patient-dashboard.html' + '?' + endcoded;
          }
           
          if(userRole == 'doctor') {
               if(localStorage.getItem('doctors') == null) {
                    localDoctors = [];
               } else {
                    let localDoctors = JSON.parse(localStorage.getItem('doctors'));
               }

               // CHECK IF THERE ARE ANY ERRORS IN THE SIGN IN PROCESS    
               localDoctors.forEach(function(doctor) {
                    if(email != doctor.email)
                    {
                         emailExist = false;
                    }
                    if(password != doctor.password)
                    {
                         passwordExist = false;
                    }
                    if(userRole != doctor.userRole)
                    {
                         userRoleExist = false;
                    }       
               })

               // FIND THE INDEX OF THE USER
               let index; 
               for(let i = 0; i < localDoctors.length; i++) {
                    if(email == localDoctors[i].email) {
                         index = i;
                    }
               }

               let toBeEncoded = localDoctors[index].userId;
               let endcoded = encodeURIComponent(toBeEncoded);

               window.location.href = 'doctor-dashboard.html' + '?' + endcoded;
          }
     }
}

// ------------------------ REGISTER FORM VALIDATION ------------------------
const RegisterUserRole = document.querySelector('.register-user-role');
const RegisterEmail = document.querySelector('.register-email');
const RegisterName = document.querySelector('.register-name');
const RegisterSelect = document.querySelector('.reg-user-role');
const RegisterPassword = document.querySelector('.register-password');
const RegisterBtn = document.querySelector('.register-btn');

//ADD EVENT LISTENER ON REGISTER FORM

function RegisterUser() {
     let selectedIndex = RegisterSelect.selectedIndex; 
     let userRole = RegisterSelect[selectedIndex].value;
     let userId = Math.floor(Math.random() * 9999);
     // let userRole = RegisterUserRole.value.toLowerCase();
     let name = RegisterName.value.toLowerCase();
     let email = RegisterEmail.value.toLowerCase();
     let password = RegisterPassword.value.toLowerCase();
     let errors = [];
     let localPatients; 
     let localDoctors;

     console.log(userRole)
debugger
     //CHECK IF ALL THE INPUTS ARE VALID
     if(name == '')
     {
          errors.push('name is required, please fill it');
     }
     if(email == '')
     {
          errors.push('email is required, please fill it');
     }
     if(password == '')
     {
          errors.push('password field is required, please fill it');
     }

     //IF THERE ARE THEN DISPLAY THE ERRORS
     if(errors.length > 0) {
          let errorsList = document.querySelector('.register-errors-ul');
     
          //FOR EACH ERROR IN THE ERRORS ARRAY, ADD A LIST ITEM WITH THE ERROR
          errors.forEach(function(error) {
               errorsList.innerHTML += `<li> ${error} </li> `; 
          })
     } else {
          if(userRole == 'patient') {

               patientDetails = {
                    name: name, 
                    email: email, 
                    password: password,
                    userId: userId
               }
               // DECLARE AND ASSIGN LOCAL PATIENT BASED ON IF IT EXISTS IN LOCAL STORAGE OR NOT
               if(localStorage.getItem('patients') == null) {
                    localPatients = [];
               } else {
                    localPatients = JSON.parse(localStorage.getItem('patients'));
               }
     
               //CHECK WHETHER THE GIVEN EMAIL ALREADY EXISTS IN LOCAL STORAGE
               localPatients.forEach(function(patient) {
                    if(email == patient.email) {
                         errors.push('email already exists');
                    } 
               })
     
               
               //IF THERE ARE THEN DISPLAY THE ERRORS
               if(errors.length > 0) {
                    let errorsList = document.querySelector('.register-errors-ul');
               
                    //FOR EACH ERROR IN THE ERRORS ARRAY, ADD A LIST ITEM WITH THE ERROR
                    errors.forEach(function(error) {
                         errorsList.innerHTML += `<li> ${error} </li> `; 
                    })
               } else {
                    localPatients.push(patientDetails);
                    localStorage.setItem('patients', JSON.stringify(localPatients));
                    
                    let toBeEncoded = patientDetails.userId;
                    let endcoded = encodeURIComponent(toBeEncoded);
     
                    window.location.href = 'patient-dashboard.html' + '?' + endcoded;
               }
          }
     
          if(userRole == 'doctor') {
               let doctorDetails = {
                    name: name, 
                    email: email, 
                    password: password,
                    userId: userId
               }
               // DECLARE AND ASSIGN LOCAL DOCTOR BASED ON IF IT EXISTS IN LOCAL STORAGE OR NOT
               if(localStorage.getItem('doctors') == null) {
                    localDoctors = [];
               } else {
                    localDoctors = JSON.parse(localStorage.getItem('doctors'));
               }
     
               //CHECK WHETHER THE GIVEN EMAIL ALREADY EXISTS IN LOCAL STORAGE
               localDoctors.forEach(function(doctor) {
                    if(email == doctor.email) {
                         errors.push('email already exists');
                    } 
               })
     
               //IF THERE ARE THEN DISPLAY THE ERRORS
               if(errors.length > 0) {
                    let errorsList = document.querySelector('.register-errors-ul');
               
                    //FOR EACH ERROR IN THE ERRORS ARRAY, ADD A LIST ITEM WITH THE ERROR
                    errors.forEach(function(error) {
                         errorsList.innerHTML += `<li> ${error} </li> `; 
                    })
               } else {
                    localDoctors.push(doctorDetails);
                    localStorage.setItem('doctors', JSON.stringify(localDoctors));
     
                    let toBeEncoded = doctorDetails.userId;
                    let endcoded = encodeURIComponent(toBeEncoded);
     
                    window.location.href = 'doctor-dashboard.html' + '?' + endcoded;
               }
          }
     }
}



function loadTemplateDoctors() {
     let doctorsNames = ['john smith', 'daniel stone', 'steve rogers', 'peter petrelli', 'dale austin', 'robert cane'];
     let doctorsEmails = ['john@gmail.com', 'daniel@gmail.com', 'steve@gmail.com', 'peter@gmail.com', 'dale@gmail.com', 'robert@gmail.com'];
     let doctorsPasswords = ['123456', '123456', '123456', '123456', '123456', '123456', '123456'];
     let doctorsSpeciality = ['General Medicine', 'Nuerology', 'Onchology', 'Optometry', 'General Practitioner', 'Dermatologist', 'Podiatrist'];
     let doctorsIDs = [7569, 4502, 1256, 8453, 4823, 9926, 3583];
     let localDoctors;
     
     if(localStorage.getItem('doctors') == null) {
          localDoctors = [];

          for(let i = 0; i < doctorsNames.length; i++) {
               doctorDetails = {
                    name: doctorsNames[i], 
                    email: doctorsEmails[i], 
                    password: doctorsPasswords[i],
                    userId: doctorsIDs[i],
                    speciality: doctorsSpeciality[i], 
               }
   
               localDoctors.push(doctorDetails);
               localStorage.setItem('doctors', JSON.stringify(localDoctors));
          }
     }
}

function loadTemplatePatients() {
     let patientsNames = ['sam grunt', 'chris todd', 'cole jenkins', 'wade isaacs', 'dwayne samson', 'sanchez'];
     let patientsEmails = ['sam@gmail.com', 'chris@gmail.com', 'cole@gmail.com', 'wade@gmail.com', 'dwayne@gmail.com', 'Sanchez@gmail.com'];
     let patientsPasswords = ['123456', '123456', '123456', '123456', '123456', '123456', '123456'];
     let patientsIds = [7855, 1325, 1289, 9853, 4568, 2658, 3985];
     let localPatients;
     if(localStorage.getItem('patients') == null) {
          localPatients = [];

          for(let i = 0; i < patientsNames.length; i++) {
               patientDetails = {
                    name: patientsNames[i], 
                    email: patientsEmails[i], 
                    password: patientsPasswords[i],
                    userId: patientsIds[i]
               }
               localPatients.push(patientDetails);
               localStorage.setItem('patients', JSON.stringify(localPatients));
          }
     }
}