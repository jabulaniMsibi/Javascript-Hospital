window.addEventListener('DOMContentLoaded', function() {
     // DISPLAY THE PATIENTS DETAILS
     displayPatientDetails();

     // DISPLAY THE PENDING APPOINTMENTS FROM LOCAL STORAGE
     displayPendingAppointments();

     // DISPLAY THE ACCEPTED APPOINTMENTS FROM LOCAL STORAGE
     displayApprovedAppointments();
          // DISPLAY THE APPOINTMENT DETAILS
          displayTheAppointmentDetails();
          // DISPLAY ASSIGNED DOCTORS INFORMATION
     //     displayAssignedDoctorsInfo();

     // DISPLAY TASKS FROM LOCAL STORAGE
     displayTasks();

     // POPULATE THE PROFILE
     populateProfile();

     // DISPLAY CHECKUPS
     displayUpcomingCheckups();

     // POPULATE THE CHECKUP DETAILS
     populateTheCheckupDetails();


     // OPEN AND CLOSE MENU 
          // OPEN MENU 
          const openMenuBtn = document.querySelector('.open-menu-container');
          openMenuBtn.addEventListener('click', openMenu);
          
          // CLOSE MENU
          const closeMenuBtn = document.querySelector('.close-menu-btn-container');
          closeMenuBtn.addEventListener('click', closeMenu);



     // SHOW HOSPITAL PROFILE
     const showHospitalProfileBtn = document.querySelector('.view-hospital-btn');
     showHospitalProfileBtn.addEventListener('click', showHospitalProfile);
     
     // VIEW ASSIGNED DOCTORS PROFILE
     const viewDoctorBtn = document.querySelector('.view-doctor');
     viewDoctorBtn.addEventListener('click', viewAssignedDoctor);

     // VIEW THE PATIENTS PROFILE
     const viewPatienBtn = document.querySelector('.view-patient');
     viewPatienBtn.addEventListener('click', viewPatientsDetails);

     // VIEW CALENDAR
     const viewAppointmentsBtn = document.querySelector('.view-appointments');
     viewAppointmentsBtn.addEventListener('click', viewCalendar);

     // CLOSE THE LIGHTBOXES
          // CLOSE THE PENDING REQUESTS LIGHTBOX
          const closePendingLightboxBtn = document.querySelector('.close-pending-lightbox');
          closePendingLightboxBtn.addEventListener('click', closePendingLightbox);

          // CLOSE THE APPOINTMENT LIGHTBOX
          const closeAppointmentLightboxBtn = document.querySelector('.close-lightbox');
          closeAppointmentLightboxBtn.addEventListener('click', closeAppointmentLightbox);

          // CLOSE THE CHECKUP LIGHTBOX
          const closeCheckupLightboxBtn = document.querySelector('.close-checkup-lightbox');
          closeCheckupLightboxBtn.addEventListener('click', closeCheckupLightbox);
          
          // CLOSE THE BOOKING APPOINTMENT LIGHTBOX
          const closeBookingLightboxBtn = document.querySelector('.close-booking-lightbox');
          closeBookingLightboxBtn.addEventListener('click', closeBookingLightbox);

     // CALENDAR FUNCTIONS
          // SHOW REQUEST APPOINTMENT FORM
          const ShowbookAppointmentBtn = document.querySelector('.book-appointment-btn');
          ShowbookAppointmentBtn.addEventListener('click', ShowbookAppointmentForm);

          // REQUEST AN APPOINTMENT FROM THE CALENDAR
          const dayBlock = document.querySelectorAll('.day-block');
          dayBlock.forEach(function(block) {
               block.addEventListener('click', function(e) {
                    // console.log(e.target.className)
                    if(e.target.className == 'day-block pending')
                    {
                         let appointmentLightbox = document.querySelector('.view-pending-appointment-lightbox');
                         appointmentLightbox.style.display = 'flex';        
                    }
                    if(e.target.className == 'day-block appointment')
                    {
                         let appointmentLightbox = document.querySelector('.view-appointment-lightbox');
                         appointmentLightbox.style.display = 'flex';        
                    }
                    if(e.target.className == 'day-block checkup')
                    {
                         let checkupLightbox = document.querySelector('.view-checkup-lightbox');
                         checkupLightbox.style.display = 'flex';        
                    }
                    if(e.target.className == 'day-block book')
                    {
                         let checkupLightbox = document.querySelector('.book-appointment-lightbox');
                         checkupLightbox.style.display = 'flex';        
                    }
               })
          })


          // REQUEST AN APPOINTMENT FROM MENU
          const submitAppointmentBtn = document.querySelector('.submit-appointment-btn');
          submitAppointmentBtn.addEventListener('click', bookAppointment);

     // SHOW PROFILE
     const viewProfileBtn = document.querySelector('.view-profile');
     viewProfileBtn.addEventListener('click', showProfileForm);

     // EDIT PROFILE 
     const editBtn = document.querySelector('.edit-btn');
     editBtn.addEventListener('click', editProfile);

     // SAVE EDITED PROFILE 
     const saveBtn = document.querySelector('.save-btn');
     saveBtn.addEventListener('click', saveProfile);

     // SIGN OUT
     const signtOutBtn = document.querySelector('.sign-out-btn');
     signtOutBtn.addEventListener('click', signOut);

     const saveTaskBtn = document.querySelector('.add-task');
     saveTaskBtn.addEventListener('click', saveNewTask);

     const taskUl = document.querySelector('.tasks');
     taskUl.addEventListener('click', function(e) {
          console.log(e.target.className)
          if(e.target.className == 'delete btn') {
               // DELETE A TASK
               deleteTask(e.target);                    
          }
          if(e.target.className == 'edit btn') {
               // EDIT A TASK
               editTask(e.target);                  
               
               const saveEditedTask = document.querySelector('.save-edited-task');
               saveEditedTask.addEventListener('click', saveCurrentTask);
          }
     })

     // CANCEL AN APPOINTMENT THATS ALREADY BEEN APPROVED
     const cancelBtn = document.querySelector('.cancel-appointment');
     cancelBtn.addEventListener('click', cancelAppointment);

})


// 
var index;

// THE CURRENT USERS DETAILS
const toBeDecoded = window.location.search;
const userId = toBeDecoded.substring(1, toBeDecoded.length);



     // OPEN MENU 
function openMenu() {
     let mainNavigation = document.querySelector('.main-navigation');
     mainNavigation.style.left = '-15px';
}

// CLOSE MENU
function closeMenu() {
     
     mainNavigation.style.left = '-100%';
}

// HIDE AND SEEK STUFF
     const mainNavigation = document.querySelector('.main-navigation');
     const ProfileSetup = document.querySelector('.setup-profile');
     const calendarDays = document.querySelector('.days');
     const patientInfo = document.querySelector('.patient-info');
     const doctorInfo = document.querySelector('.doctor-info');
     const patientReg = document.querySelector('.patient-registration');
     const hospitalProfile = document.querySelector('.hospital-profile'); 

     // SHOW HOSPITAL PROFILE
     function showHospitalProfile() {

          populateTheHospProfile();
      
          // HIDE EVERYTHING AND JUST SHOW ALL THE PATIENTS
          patientInfo.style.display = 'none';   
          calendarDays.style.display = 'none';
          doctorInfo.style.display = 'none';
          patientReg.style.display = 'none';
          hospitalProfile.style.display = 'block';
      
          mainNavigation.style.left = '-100%';
     }

     function populateTheHospProfile() {
          let hospName = document.querySelector('.hosp-name');
          let hospEmail = document.querySelector('.hosp-email');
          let hospAddress = document.querySelector('.hosp-address');
          let hospNumber = document.querySelector('.hosp-number');
          let hospCity = document.querySelector('.hosp-city');
          let hospCountry = document.querySelector('.hosp-country');
          let hospProvince = document.querySelector('.hosp-province');
          let hospCode = document.querySelector('.hosp-code');
          let hospDetails = JSON.parse(localStorage.getItem('hospital details'));
      
          if(hospDetails != null) {
               hospName.textContent = hospDetails.name.toUpperCase();
               hospEmail.textContent = hospDetails.email.toUpperCase();
               hospAddress.textContent = hospDetails.address.toUpperCase();
               hospNumber.textContent = hospDetails.number;
               hospCity.textContent = hospDetails.city.toUpperCase();
               hospCountry.textContent = hospDetails.country.toUpperCase();
               hospProvince.textContent = hospDetails.province.toUpperCase();
               hospCode.textContent = hospDetails.zipCode;
          }
     }

     // VIEW ASSIGNED DOCTORS PROFILE
     function viewAssignedDoctor() {
          patientReg.style.display = 'none';
          patientInfo.style.display = 'none';
          calendarDays.style.display = 'none';
          hospitalProfile.style.display = 'none';
          doctorInfo.style.display = 'block';
         
         mainNavigation.style.left = '-100%';
     }

     // VIEW PATIENTS PROFILE 
     function viewPatientsDetails() {
          patientReg.style.display = 'none';
          calendarDays.style.display = 'none';
          doctorInfo.style.display = 'none';
          hospitalProfile.style.display = 'none';
          patientInfo.style.display = 'block';
         
         mainNavigation.style.left = '-100%';
     }

     // VIEW CALENDAR
     function viewCalendar() {
          patientReg.style.display = 'none';
          doctorInfo.style.display = 'none';
          patientInfo.style.display = 'none';
          hospitalProfile.style.display = 'none';   
         calendarDays.style.display = 'flex';
     
         mainNavigation.style.left = '-100%';
     }

     // SHOW PROFILE EDIT FORM
     function showProfileForm() {
          patientReg.style.display = 'none';
          doctorInfo.style.display = 'none';
          hospitalProfile.style.display = 'none';   
          calendarDays.style.display = 'none';
          patientInfo.style.display = 'block';
         
         mainNavigation.style.left = '-100%';
     }

     function ShowbookAppointmentForm() {
          let checkupLightbox = document.querySelector('.book-appointment-lightbox');
          checkupLightbox.style.display = 'flex';
     }

     function bookAppointment(e) {
          // e.preventDefault();
          let appointmentDate = document.querySelector('.book-appointment-date').value;
          let appointmentDay = appointmentDate.substring(8);
         
          let appointmentDetails = {
              patientId: userId,
              reason: document.querySelector('.book-appointment-reason').value,
              date: appointmentDate,
              day: appointmentDay
          }
      
          let valid = checkIfBookingDateIsValid(appointmentDate);
      
          if(valid == true) {
               console.log(appointmentDay);
               
               debugger;
               document.getElementById(`${parseInt(appointmentDay)}`).classList.add('pending');
               document.getElementById(`${parseInt(appointmentDay)}`).classList.remove('book');
      
              if(localStorage.getItem('pending appointments') == null ) {
              
                  let PendingAppointments = [];
                  PendingAppointments.push(appointmentDetails);
                  localStorage.setItem('pending appointments', JSON.stringify(PendingAppointments));
              } else {
              
                  let PendingAppointments = JSON.parse(localStorage.getItem('pending appointments'));
                  PendingAppointments.push(appointmentDetails);
                  localStorage.setItem('pending appointments', JSON.stringify(PendingAppointments));
              }
      
          } else {
      
              // VALID IS FALSE, DATE HAS PASSED
              console.log('valid is false,  date has passed');
              alert('This date is unavailable.')
          }
      
          closeBookingLightbox();
          closeMenu();
          window.location.reload();
     }

     // CHECK IF THE GIVEN DATE IS VALID OR NOT
     function checkIfBookingDateIsValid(userDate) {

          var date = userDate.split('-');
          var newDate = date[0]+"/"+date[1]+"/"+date[2];
          var requestedDay = new Date(newDate).getTime();
      
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var day = new Date().getDate();
          var concat = year+"/"+month+"/"+day;
          var today = new Date(concat).getTime()
      
          if (today < requestedDay || today == requestedDay) {
      
              return true;
          } else {
      
              return false;
          }
     }


     function closeTheLightBox() {

     }

     function closePendingLightbox() {
          let pendingLightbox = document.querySelector('.view-pending-appointment-lightbox');
              pendingLightbox.style.display = 'none';
     }
     
     function closeAppointmentLightbox() {
          let appointmentLightbox = document.querySelector('.view-appointment-lightbox');
          appointmentLightbox.style.display = 'none';
     }

     function closeCheckupLightbox() {
          let checkupLightbox = document.querySelector('.view-checkup-lightbox');
              checkupLightbox.style.display = 'none';
     }


     function closeBookingLightbox() {
          let checkupLightbox = document.querySelector('.book-appointment-lightbox');
          checkupLightbox.style.display = 'none';
     }

     function editProfile() {
          console.log('fgyguihoj')
          let email = document.querySelector('#email');
          let reason = document.querySelector('#reason');
          let number = document.querySelector('#cell-number');
          let faxNumber = document.querySelector('#fax-number');
          let address = document.querySelector('#address');
          let bloodGroup = document.querySelector('#blood-group');
          let hiddenInputs = document.querySelectorAll('.hidden');
          let saveBtnContainer = document.querySelector('.save-btn-container');
      
          email.textContent = '';
          number.textContent = ''; 
          faxNumber.textContent = '';
          address.textContent = '';
          bloodGroup.textContent = '';
      
          hiddenInputs.forEach(function(input) {
              input.style.display = 'block';
          })
      
          let editBtn = document.querySelector('.edit-btn');
          editBtn.style.display = 'none';
          saveBtnContainer.style.display = 'flex';
     }
      
     function saveProfile() {
          let currentUser = getCurrentUser();
          let email = document.querySelector('#email');
          let emailValue = document.querySelector('.visit-email').value;
      
          let number = document.querySelector('#cell-number');
          let numberValue = document.querySelector('#cell-number-input').value;
      
          let faxNumber = document.querySelector('#fax-number');
          let faxNumberValue = document.querySelector('#fax-number-input').value;
      
          let address = document.querySelector('#address');
          let addressValue = document.querySelector('#address-input').value;
      
          let bloodGroup = document.querySelector('#blood-group');
          let bloodGroupValue = document.querySelector('#blood-group-select');
          let selectIndex = bloodGroupValue.selectedIndex;
          let selectedBloodGroupValue = bloodGroupValue[selectIndex].value;
       
          let hiddenInputs = document.querySelectorAll('.hidden');
          let localPatients = JSON.parse(localStorage.getItem('patients'));
          let patientIndex;
      
      
      
          for (let i = 0; i < localPatients.length; i++) {
              if (localPatients[i].userId == currentUser.userId) {
                  patientIndex = i;
              }
          }
      
          let patientDetails = {
              name: localPatients[patientIndex].name,
              password: localPatients[patientIndex].password,
              userId: localPatients[patientIndex].userId,
              email: emailValue,
              phoneNumber: numberValue,
              address: addressValue,
              faxNumber: faxNumberValue,
              bloodGroup: selectedBloodGroupValue
          }
      
          let filtered = localPatients.filter(function(patient, i) {
              return patientIndex != i;
          })
      
          filtered.push(patientDetails);
          localStorage.setItem('patients', JSON.stringify(filtered));
      
          email.textContent = emailValue;
          number.textContent = numberValue; 
          faxNumber.textContent = faxNumberValue;
          address.textContent = addressValue;
          bloodGroup.textContent = selectedBloodGroupValue;
      
          hiddenInputs.forEach(function(input) {
              input.style.display = 'none';
          })
      
          let editBtn = document.querySelector('.edit-btn');
          let saveBtn = document.querySelector('.save-btn');
          saveBtn.style.display = 'none';
          editBtn.style.display = 'block';
     }
      
     // GET THE CURRENT USER
     function getCurrentUser() {
          let decoded = decodeURIComponent(window.location.search);
          let userId = decoded.substring(1, decoded.length);
          let localPatients = JSON.parse(localStorage.getItem('patients'));
          let localDoctors = JSON.parse(localStorage.getItem('doctors'));
          let currentUser;
          let index; 
      
          // CHECK IF THE USER IS A PATIENT
          for (let i = 0; i < localPatients.length; i++) 
          {
               if(localPatients[i].userId == userId)
               {
                    index = i;
               }
          }
      
          currentUser = localPatients[index];
          return currentUser;
     }

     function signOut() {
          let status = confirm('are you sure you want to sign out?')
          if(status == true) {
               window.location.href = 'hosp.html';
          } else {
               closeMenu();
          }
     } 

     // DISPLAY THE PENDING APPOINTMENTS FROM LOCAL STORAGE
     function displayPendingAppointments() {
          let currentUser = getCurrentUser();
          let pendingAppointments;
          if(localStorage.getItem('pending appointments') != null) {
              pendingAppointments = JSON.parse(localStorage.getItem('pending appointments'));
      
              pendingAppointments.forEach(function(appointment, i) {
      
                  if(appointment.patientId == currentUser.userId) {
                      document.getElementById(parseInt(appointment.day)).style.backgroundColor = 'grey';
                      document.getElementById(parseInt(appointment.day)).classList.add('pending');
                      document.getElementById(parseInt(appointment.day)).classList.remove('book');
      
                  }
              })
          }
     }

     // DISPLAY THE ACCEPTED APPOINTMENTS FROM LOCAL STORAGE
     function displayApprovedAppointments() {
          let currentUser = getCurrentUser();
          let appointments;
      
          if(localStorage.getItem('approved appointments') != null) {
              appointments = JSON.parse(localStorage.getItem('approved appointments'));
              appointments.forEach(function(appointment) {
                  
                  if(currentUser.userId == appointment.patientId) {
                      document.getElementById(parseInt(appointment.day)).classList.add('appointment');
                      document.getElementById(parseInt(appointment.day)).classList.remove('book');
                  }
              })
          }
     }

     
     function saveNewTask() {
          let currentUser = getCurrentUser();
          let name = document.querySelector('.task-name').value;
          let description = document.querySelector('.task-description').value;
          let localPatientsTasks; 
          let taskDetails = {
               taskName: name,
               taskDesc: description, 
               patientId: currentUser.userId
          }
     
          if(localStorage.getItem('patients tasks') == null) {
               localPatientsTasks = [];
          } else {
               localPatientsTasks = JSON.parse(localStorage.getItem('patients tasks'));
          }
     
          localPatientsTasks.push(taskDetails);
          localStorage.setItem('patients tasks', JSON.stringify(localPatientsTasks));
     
          window.location.reload();
     }

function displayTasks() {
    let tasksUl = document.querySelector('.tasks');
    let heading = document.querySelector('.tasklist-heading');
    let currentUser = getCurrentUser();
    let localPatientsTasks;
    let tasksToDisplay = [];
    if(localStorage.getItem('patients tasks') != null) {
         localPatientsTasks = JSON.parse(localStorage.getItem('patients tasks'));
         for (let i = 0; i < localPatientsTasks.length; i++) {
              if(localPatientsTasks[i].patientId == currentUser.userId) {
                   tasksToDisplay.push(localPatientsTasks[i].taskName);
              }
         }

         if(tasksToDisplay.length > 0) {
              tasksToDisplay.forEach(function(task, index) {
                   tasksUl.innerHTML += `<li id="${index}">
                                            <h6>${task}</h6>
                                            <div class="task-options">
                                                 <a class="edit btn">Edit</a>
                                                 <a class="delete btn">Delete</a>
                                            </div>
                                       </li>`;
              })

              heading.style.display = 'block';
         }
    }
}

function editTask(editBtn) {
     index = parseInt(editBtn.parentNode.parentNode.id);
     let addBtn = document.querySelector('.add-task');
     let saveBtn = document.querySelector('.save-edited-task');
     let taskName = document.querySelector('.task-name');
     let taskDescription = document.querySelector('.task-description')

     addBtn.style.display = 'none';
     saveBtn.style.display = 'block';

     localTasks = JSON.parse(localStorage.getItem('patients tasks'));
     taskName.value = localTasks[index].taskName;
     taskDescription.value = localTasks[index].taskDesc;

     return index;
}

function saveCurrentTask() {
     let taskDescription = document.querySelector('.task-description')
     let taskName = document.querySelector('.task-name');
     let currentUser = getCurrentUser();
     let index = editTask();
     console.log(index);
     
     let editedTask; 
     // hide current save btn
     saveBtn.style.display = 'none';

     // show new save btn 
     addBtn.style.display = 'block';

     editedTask = {
          taskName: taskName.value,
          taskDesc: taskDescription.value,
          doctorId: currentUser.userId
     }

     // this btn will save the "new" task to local storage
     localTasks = JSON.parse(localStorage.getItem('doctors tasks'));
     console.log(localTasks[index]);

     localTasks.push(editedTask);
     let filtered = localTasks.filter(function(task, i) {
          return index != i;
     })

     // localStorage.setItem('doctors tasks', JSON.stringify(filtered));

     // and display it to the user. 
}

function deleteTask(deleteBtn) {
     let parent = deleteBtn.parentNode.parentNode;
     let tasks = JSON.parse(localStorage.getItem('patients tasks'));
     let currentUser = getCurrentUser();

     parent.remove();
     console.log(currentUser)

     let filteredTasks = tasks.filter(function(task, i) {
          let taskId = parent.id;
          return i != taskId;
     })

     localStorage.setItem('patients tasks', JSON.stringify(filteredTasks));
     window.location.reload();
}

function displayPatientDetails() {
     let currentUser = getCurrentUser();
     let patientNames = document.querySelectorAll('.patient-name');
     let patientDps = document.querySelectorAll('.patient-dp');
 
     // DISPLAY THE PATIENTS NAME
     patientNames.forEach(function(name) {
         name.textContent = currentUser.name.toUpperCase();
 
     })
     var x = currentUser.name.split(' ');
 
     // DISPLAY THE PATIENTS DP
     patientDps.forEach(function(dp) {
         dp.src = `images/${x[0]}.jpg`;
 
     })
 }
 
function populateProfile() {
     let email = document.querySelector('#email');
     let reason = document.querySelector('#reason');
     let number = document.querySelector('#cell-number');
     let faxNumber = document.querySelector('#fax-number');
     let address = document.querySelector('#address');
     let bloodGroup = document.querySelector('#blood-group');
     let currentUser = getCurrentUser();
 
     email.textContent = currentUser.email;
     number.textContent = currentUser.phoneNumber;
     faxNumber.textContent = currentUser.faxNumber;
     address.textContent = currentUser.address;
     bloodGroup.textContent = currentUser.bloodGroup;
}

function cancelAppointment(e) {
     // GET LOCAL STORAGE CONTENT
     let acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));
     let appointmentIndex = e.target.previousElementSibling.id;
 
     // CONFIRM THE ACTION
     let status = confirm('are you sure you want to cancel the appointment?');
 
     // IF TRUE, DELETE
     if(status == true) {
 
         let filtered = acceptedAppointments.filter(function(appointment, i) {
             return appointmentIndex != i;
         })
 
         // SET THE FILTERED ARRAY
         localStorage.setItem('approved appointments', JSON.stringify(filtered));
     }
 
     // RELOAD THE WINDOW
     window.location.reload();
}

function displayTheAppointmentDetails() {
     // console.log('stuff');
     
     let patientsName = document.querySelector('.patients-name');
     let patientsId = document.querySelector('.patients-id');
     let patientsReason = document.querySelector('.patients-reason');
     let patientsDoctor = document.querySelector('.patients-doctor');
     let appointmentDate = document.querySelector('.appointment-date');
     let currentUser = getCurrentUser();
     let approvedAppointments;
     
     if(localStorage.getItem('approved appointments') != null) {
          approvedAppointments = JSON.parse(localStorage.getItem('approved appointments'));

          approvedAppointments.forEach(function(appointment, i) {
               if(currentUser.userId == parseInt(appointment.patientId)) {
                    // console.log(currentUser.userId);
                    // console.log(parseInt(appointment.patientId));
                    patientsName.textContent = `Patient Name: ${appointment.patientName.toUpperCase()}`;
                    patientsId.textContent = `Patient Id: ${appointment.patientId}`;
                    patientsReason.textContent = `Reason For Visit: ${appointment.reason}`;
                    patientsDoctor.textContent = `Assigned Doctor: ${appointment.assignedDoctor.toUpperCase()}`;
                    appointmentDate.textContent = `Appointment Date: ${appointment.date}`;
               }
          })
     }
}

function displayUpcomingCheckups() {
     let currentUser = getCurrentUser();
     let dayblocks = document.querySelectorAll('.day-block');
     let bookedCheckups;
     if(localStorage.getItem('booked checkups') != null) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));

          bookedCheckups.forEach(function(checkup, i) {
               if(checkup.patientId == currentUser.userId) {
                    dayblocks.forEach(function(block) {
                         if(block.id == parseInt(checkup.day)) {
                              document.getElementById(`${parseInt(checkup.day)}`).classList.add('checkup');
                              document.getElementById(`${parseInt(checkup.day)}`).classList.remove('book');
                         }
                    })
               }
          })
     }
}

function populateTheCheckupDetails() {
     let checkupUl = document.querySelector('.checkup-details')
     let dayblocks = document.querySelectorAll('.day-block');
     let bookedCheckups;

     // TEST MULTIPLE CHECK UP DETAILS
     if(localStorage.getItem('booked checkups') != null) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));

          dayblocks.forEach(function(block) {
               bookedCheckups.forEach(function(checkup, l) {
                    if(block.id == parseInt(checkup.day)) {
                         checkupUl.innerHTML = `<li id="${l}"><h4>Patient name: ${bookedCheckups[l].patientName}</h4>
                                                  <h4>Patient Id: ${bookedCheckups[l].patientId}</h4>
                                                  <h4>Assigned Doctor: ${bookedCheckups[l].assignedDoctor}</h4>
                                                  <h4>Doctor Speciality: ${bookedCheckups[l].doctorSpeciality}</h4>
                                                  <h4>Reason For Checkup: ${bookedCheckups[l].reason}</h4></li>`
                    }
               })
          })
     }
}

