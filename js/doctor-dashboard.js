window.addEventListener('DOMContentLoaded', function(e) {
     // OPEN MENU FUNCTION
     openMenuBtn.addEventListener('click', openMenu);
     
     // CLOSE MENU FUNCTION
     closeMenuBtn.addEventListener('click', closeMenu);

     // PENDING APPOINTMENTS FUNCTION
     checkLocalStorage();

     //GET THE CURRENT USER
     getCurrentUser();

     // SHOW UPCOMING CHECKUPS
     showCheckups();

     // POPULATE THE CHECKUP DETAILS
     populateTheCheckupDetails();

     // SHOW ALL THE DOCTORS APPOINTMENTS
     showDoctorsAppointments();

     // CLOSE THE CHECKUP DETSAILS LIGHTBOX
     const closeCheckupLightboxBtn = document.querySelector('.close-checkup-lightbox');
     closeCheckupLightboxBtn.addEventListener('click', closeCheckupLightbox);

     // SHOW THE PENDING APPOINTMENTS LIGHTBOX
     const pendingBtn = document.querySelector('.view-pending-appointment-btn');
     pendingBtn.addEventListener('click', showPendingAppointments);

     // DISPLAY THE PENDING APPOINTMENTS
     displayThePendingAppointments();

     // CLOSE REQUESTS LIGHTBOX
     const closeRequestsBtn = document.querySelector('.close-requests-lightbox');
     closeRequestsBtn.addEventListener('click', closeRequestsLigthbox);
     
     // ACCEPTING AN APPOINTMENT FUNCTIONALITY
     const requestsUl = document.querySelector('.requests');
     requestsUl.addEventListener('click', function(e) {
          if(e.target.classList == 'accept btn') {
               // SHOW ALL DOCTORS
               showDoctors(e);

               let doctorsUl = document.querySelector('.doctors');
               doctorsUl.addEventListener('click' ,function(e) {
                    acceptAppointment(e);
               })
          }
          if(e.target.classList == 'deny btn') {
               denyAppointment(e);
          }
     })

     const doctorsUl = document.querySelector('.doctors');
     doctorsUl.addEventListener('click', showCheckupForm);

     // REGISTER THE HOSPITAL
     const RegHopBtn = document.querySelector('.register-hospital-btn');
     RegHopBtn.addEventListener('click', registerTheHospital);

     // DAILY TASKS FUNCTIONALITY
          // SAVE THE TASKS
          const addTask = document.querySelector('.add-task');
          addTask.addEventListener('click', saveNewTask);

          // ALL THE TASKS FUNCTIONALITY
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
               }
          })
               // DISPLAY THE TASKS
               displayTasks();

     // DISPLAY THE DOCTORS
          // DISPLAY ALL THE DOCTORS
          displayDoctorDetails();

          // CLOSE THE DOCTORS LIGHTBOX
          const closeDoctorsLightboxBtn = document.querySelector('.close-doctors-lightbox');
          closeDoctorsLightboxBtn.addEventListener('click', closeDoctorsLightbox);

     // SIGN OUT
     const signtOutBtn = document.querySelector('.sign-out-btn');
     signtOutBtn.addEventListener('click', signOut);


     // DISPLAY ALL THE DOCTORS
     const viewDoctorBtn = document.querySelector('.view-doctor');
     viewDoctorBtn.addEventListener('click', displayAllDoctors);

     // DISPLAY ALL THE PATIENTS
     const viewPatienBtn = document.querySelector('.view-patient');
     viewPatienBtn.addEventListener('click', displayAllPatients);

     // DISPLAY THE HOSPITAL REGISTRATION FORM
     const showRegFormBtn = document.querySelector('.edit-hospital-btn');
     showRegFormBtn.addEventListener('click', showHospRegForm);

     // DISPLAY HOSPITAL INFO
     const showHospitalInfoBtn = document.querySelector('.view-hospital-btn');
     showHospitalInfoBtn.addEventListener('click', showHospProfile);

     // POPULATE THE HOSPITAL PROFILE
     populateTheHospProfile();

     // SHOW ALL THE PATIENTS
     const showAllPatientsBtn = document.querySelector('.view-patient');
     showAllPatientsBtn.addEventListener('click', showAllPatients);


     const dayblocks = document.querySelectorAll('.day-block');
     dayblocks.forEach(function(block, i) {

          if (block.classList == 'day-block appointment') {
               console.log('appointment');
               block.addEventListener('click', showAppointmentInfo);
          }

          if (block.classList == 'day-block book') {
               block.addEventListener('click', showPatientsLightbox);
          }

          if (block.classList == 'day-block checkup') {
               block.addEventListener('click', showCheckupLightbox);
          }
     })

     const patientsUl = document.querySelector('.patients');
     patientsUl.addEventListener('click', function(e) {
          e.preventDefault();

          if(e.target.classList == 'btn set-checkup') {
               // showCheckupForm(e);     
               showDoctors(e)          

               const doctorsUl = document.querySelector('.doctors');
               doctorsUl.addEventListener('click', function(e) {
                    assignDoctor(e);

                    const submitCheckupBtn = document.querySelector('.submit-checkup-btn');
                    submitCheckupBtn.addEventListener('click', bookTheCheckup);
               });
          }
     })

     const closeIndividualAppointmentLightboxBtn = document.querySelector('.close-individual-appointment-lightbox');
     closeIndividualAppointmentLightboxBtn.addEventListener('click', closeIndividualAppointmentLightbox);

     // const closeCheckupLightboxBtn = document.querySelector('.close-checkup-lightbox');
     // closeCheckupLightboxBtn.addEventListener('click', closeCheckupLightbox);

     const closeAllPatientsLightboxBtn = document.querySelector('.close-patients-lightbox');
     closeAllPatientsLightboxBtn.addEventListener('click', closeAllPatientsLightbox);

     const saveEditedTask = document.querySelector('.save-edited-task');
     saveEditedTask.addEventListener('click', saveCurrentTask);

     const editProfileBtn = document.querySelector('.edit-profile-btn');
     editProfileBtn.addEventListener('click', editProfile);

     const saveProfileBtn = document.querySelector('.save-profile-btn');
     saveProfileBtn.addEventListener('click', saveProfile);

     const bookCheckupBtn = document.querySelector('.submit-checkup-btn');
     bookCheckupBtn.addEventListener('click', bookTheCheckup);
})












let patientIndex;
let doctorIndex;
let index;

// ------------------------------ OPEN AND CLOSE MENU FUNCTIONS ------------------------------
const openMenuBtn = document.querySelector('.open-menu-container');
const closeMenuBtn = document.querySelector('.close-menu-btn-container');
const mainNavigation = document.querySelector('.main-navigation');

// ------------------------------ OPEN MENU FUNCTION ------------------------------
function openMenu() {
    
     mainNavigation.style.left = '-15px';
}

// ------------------------------ CLOSE MENU FUNCTION ------------------------------
function closeMenu() {
     mainNavigation.style.left = '-100%';
}

// ------------------------------ PENDING APPOINTMENTS FUNCTION ------------------------------
function checkLocalStorage() {
     let notificationAmount = document.querySelector('.notification');

     if(localStorage.getItem('pending appointments') != null)
     {
          let pendingAppointments = JSON.parse(localStorage.getItem('pending appointments'));
      
          notificationAmount.style.display = 'flex';
          notificationAmount.textContent = pendingAppointments.length; 
     } else {
          notificationAmount.style.display = 'none';

     }
}


// ------------------------------ GET THE CURRENT USER ------------------------------
function getCurrentUser() {
     let decoded = decodeURIComponent(window.location.search);
     let userId = decoded.substring(1, decoded.length);
     let localPatients = JSON.parse(localStorage.getItem('patients'));
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let currentUser;
     let index; 

     // CHECK IF THE USER IS A DOCTOR
     for (let i = 0; i < localDoctors.length; i++) 
     {
          if(localDoctors[i].userId == userId)
          {
               index = i;
               isPatient = false;
          }
     }

     currentUser = localDoctors[index];
     return currentUser;
}


// ------------------------------ VIEW ALL PENDING APPOINTMENTS ------------------------------
function viewPendingAppointments() {
     let container = document.querySelector('.calendar');
     let patientNameText = document.querySelector('.patient-id');
     let reasonForVisitText = document.querySelector('.reason-for-visit');
     let requestedDateText = document.querySelector('.requested-date');
     let index; 
     let doctorsUl = document.querySelector('.doctors');
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));

     localDoctors.forEach(function(doctor) {
          doctorsUl.innerHTML += `<li>
                                   <h6>${doctor.name}</h6>
                                   <div class="doctor-options">
                                   <a class="assign btn" >Assign</a>
                                   </div>
                              </li>`
     });

     if(localStorage.getItem('pending appointments') != null) {
          let localPatients = JSON.parse(localStorage.getItem('patients'));
          let appointments = JSON.parse(localStorage.getItem('pending appointments'));
          let currentUser = getCurrentUser();
          // LOOP THROUGH THE PENDING APPOINTMENTS FROM LOCAL STORAGE
          appointments.forEach(appointment => {
               patientId = appointment.patientId;

               // CHECK IF USERS EXIST, AT THIS POINT THEY SHOULD ALWAYS EXIST THOUGH
               if(localPatients != null) {

                    // LOOP THROUGH THE PATIENTS FROM LOCAL STORAGE TO FIND A MATCHING USER ID
                    for (let i = 0; i < localPatients.length; i++) {
                         if(patientId == localPatients[i].userId) {

                              // ONCE FOUND INDEX SHOULD = I, SO WE CAN USE INDEX LATER
                              index = i;
                         }
                    }
               }

               // POPULATE THE DATA ON HTML
               patientNameText.textContent = localPatients[index].name;
               reasonForVisitText.textContent = appointments[index].reason;
               requestedDateText.textContent = appointments[index].date;
          });
     }
}

const calendarDays = document.querySelector('.days');
const doctorsInfo = document.querySelector('.doctors-info');
const hospitalForm = document.querySelector('.hospital-setup-form');
const hospProfile = document.querySelector('.hospital-profile');
const patientsList = document.querySelector('.all-patients')
const doctorsList = document.querySelector('.all-doctors');


// ------------------------ HIDE EVERYTHING AND DISPLAY PROFILE INFO ------------------------
const viewProfileBtn = document.querySelector('.view-profile');

viewProfileBtn.addEventListener('click', function() {
     calendarDays.style.display = 'none';
     hospitalForm.style.display = 'none';
     hospProfile.style.display = 'none';
     doctorsInfo.style.display = 'block';
     patientsList.style.display = 'none';

     mainNavigation.style.left = '-100%';
})

// ------------------------ HIDE EVERYTHING AND DISPLAY CALENDAR ------------------------
const viewAppointmentsBtn = document.querySelector('.view-appointments');

viewAppointmentsBtn.addEventListener('click', function() {
     hospitalForm.style.display = 'none';   
     hospProfile.style.display = 'none';   
     patientsList.style.display = 'none';
     doctorsInfo.style.display = 'none';
     calendarDays.style.display = 'flex';

     mainNavigation.style.left = '-100%';
})

// ------------------------ REGISTER THE HOSPITAL ------------------------
function registerTheHospital(e) {
     e.preventDefault();
     let hospName = document.querySelector('.hospital-name').value;
     let hospEmail = document.querySelector('.hospital-email').value;
     let hospAddress = document.querySelector('.hospital-address').value;
     let hospNumber = document.querySelector('.hospital-number').value;
     let hospCity = document.querySelector('.hospital-city').value;
     let hospProvince = document.querySelector('.hospital-province').value;
     let hospCountry = document.querySelector('.hospital-country').value;
     let hospCode = document.querySelector('.hospital-code').value;

     hospDetails = {
          name: hospName, 
          email: hospEmail, 
          address: hospAddress,
          number: hospNumber, 
          city: hospCity, 
          province: hospProvince, 
          country: hospCountry, 
          zipCode: hospCode
     }

     // THERE CAN ONLY EVER BE ONE HOSPITAL AT A TIME, WE DONT NEED TO STORE IT IN AN ARRAY

     let confirmed = confirm('are you sure you want to save?');
     if(confirmed == true) {
          localStorage.setItem('hospital details', JSON.stringify(hospDetails));
     }
     window.location.reload();
}

// ------------------------ DISPLAY THE APPROPRIATE PROFILE PICTURE BASED ON USER ------------------------
function diplayProfilePicture() {
     let img = document.querySelector('.doctor-dp');
     let currentUser = getCurrentUser();
     img.src = '/images/' + currentUser.name + '.jpg';

     let doctorName = document.querySelector('.doctor-name');
     doctorName.textContent = currentUser.name;
}

// ------------------------ DAILY TASKS FUNCTIONALITY ------------------------
// ------------------------ SAVE THE NEW TASK ------------------------
function saveNewTask() {
     let currentUser = getCurrentUser();
     let name = document.querySelector('.task-name').value;
     let description = document.querySelector('.task-description').value;
     let localDoctorsTasks; 
     let taskDetails = {
          taskName: name,
          taskDesc: description, 
          doctorId: currentUser.userId
     }

     if(localStorage.getItem('doctors tasks') == null) {
          localDoctorsTasks = [];
     } else {
          localDoctorsTasks = JSON.parse(localStorage.getItem('doctors tasks'));
     }

     localDoctorsTasks.push(taskDetails);
     localStorage.setItem('doctors tasks', JSON.stringify(localDoctorsTasks));

     window.location.reload();
}

// ------------------------ DISPLAY THE TASKS ------------------------
function displayTasks() {
     let tasksUl = document.querySelector('.tasks');
     let heading = document.querySelector('.tasklist-heading');
     let currentUser = getCurrentUser();
     let localDoctorsTasks;
     let tasksToDisplay = [];
     if(localStorage.getItem('doctors tasks') != null) {
          localDoctorsTasks = JSON.parse(localStorage.getItem('doctors tasks'));
          for (let i = 0; i < localDoctorsTasks.length; i++) {
               if(localDoctorsTasks[i].doctorId == currentUser.userId) {
                    tasksToDisplay.push(localDoctorsTasks[i].taskName);
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

// ------------------------ DELETE TASK ------------------------
function deleteTask(deleteBtn) {
     let parent = deleteBtn.parentNode.parentNode;
     let tasks = JSON.parse(localStorage.getItem('doctors tasks'));
     let currentUser = getCurrentUser();

     parent.remove();
     console.log(currentUser)

     let filteredTasks = tasks.filter(function(task, i) {
          let taskId = parent.id;
          return i != taskId;
     })

     localStorage.setItem('doctors tasks', JSON.stringify(filteredTasks));
     window.location.reload();
}

// ------------------------ EDIT TASK ------------------------
function editTask(editBtn) {
     index = editBtn.parentNode.parentNode.id;
     let addBtn = document.querySelector('.add-task');
     let saveBtn = document.querySelector('.save-edited-task');
     let taskName = document.querySelector('.task-name');
     let taskDescription = document.querySelector('.task-description')

     addBtn.style.display = 'none';
     saveBtn.style.display = 'block';

     localTasks = JSON.parse(localStorage.getItem('doctors tasks'));
     taskName.value = localTasks[index].taskName;
     taskDescription.value = localTasks[index].taskDesc;

     return index;
}

function saveCurrentTask() {
     let taskDescription = document.querySelector('.task-description')
     let taskName = document.querySelector('.task-name');
     let currentUser = getCurrentUser();
     let index = editTask();
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

// CLOSE THE DOCTORS LIGHTBOX 
function closeDoctorsLightbox() {
     let checkupLightbox = document.querySelector('.view-available-doctors-lightbox');
          checkupLightbox.style.display = 'none';
}

function showPendingAppointments() {
     let lightbox = document.querySelector('.view-pending-appointments-lightbox');
     lightbox.style.display = 'flex';
}

function displayThePendingAppointments() {
     let requestsUl = document.querySelector('.requests');
     if(localStorage.getItem('pending appointments') != null) {
          pendingAppointmens = JSON.parse(localStorage.getItem('pending appointments'));

          pendingAppointmens.forEach(function(appointment, i) {
               requestsUl.innerHTML += `<li id="${i}">
                                             <div class="appointment-details">
                                                  <h5>Patient Number: ${appointment.patientId}</h5>
                                                  <h6>Reason For Visit: ${appointment.reason}</h6>
                                             </div>
                                             <div class="appointment-actions">
                                                  <a class="accept btn">Accept</a>
                                                  <a class="deny btn">Deny</a>
                                             </div>
                                        </li>`
          })
     }
}

function closeRequestsLigthbox() {
     let lightbox = document.querySelector('.view-pending-appointments-lightbox');
     lightbox.style.display = 'none';
}

function showDoctors(e) {
     let doctorsLightbox = document.querySelector('.view-available-doctors-lightbox');
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let doctorsUl = document.querySelector('.doctors');

     doctorsLightbox.style.display = 'flex';
     doctorsLightbox.style.zIndex = 9;

     if(!doctorsUl.innerHTML) {
          localDoctors.forEach(function(doctor, i) {
               console.log(!doctorsUl.innerHTML)
               doctorsUl.innerHTML += `<li id="${i}">
                                             <div class="doctors-details">
                                                  <h5>${doctor.name}</h5>
                                                  <h6>${doctor.speciality}</h6>
                                             </div>
                                             <div class="doctor-actions">
                                                  <a class="assign btn">Assign</a>
                                             </div>
                                        </li>`
          })     
     }

     patientIndex = e.target.parentNode.id;
     console.log(patientIndex);
     
     let bookedCheckups
     if(localStorage.getItem('booked checkups') != null) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));
          
     } else {
          bookedCheckups = [];

     }

     let localPatients = JSON.parse(localStorage.getItem('patients'));
     if(localPatients != null) {
          let checkupDetails = {
               patientName: localPatients[patientIndex].name,
               patientId: localPatients[patientIndex].userId 
          }
          bookedCheckups.push(checkupDetails);

          localStorage.setItem('booked checkups', JSON.stringify(bookedCheckups));
     }
}

function assignDoctor(e) {
     doctorIndex = parseInt(e.target.parentNode.parentNode.id);
     let bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));

     let newCheckup = {
          patientName: bookedCheckups[bookedCheckups.length -1].patientName,
          patientId: bookedCheckups[bookedCheckups.length -1].patientId,
          assignedDoctor: localDoctors[doctorIndex].name,
          doctorSpeciality: localDoctors[doctorIndex].speciality,
          doctorId: localDoctors[doctorIndex].userId
     }
     console.log(newCheckup);
     console.log(newCheckup.doctorId);
     
     
     debugger
     bookedCheckups[bookedCheckups.length -1] = newCheckup;
     localStorage.setItem('booked checkups', JSON.stringify(bookedCheckups));
}

function bookTheCheckup() {
     let reason = document.querySelector('.book-checkup-reason').value;
     let date = document.querySelector('.book-checkup-date').value;
     let day = date.substring(date.length -2, date.length);
     let bookedCheckups;
     if(localStorage.getItem('booked checkups') != null) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));
          
          let newCheckup = {
               patientName: bookedCheckups[bookedCheckups.length -1].patientName,
               patientId: bookedCheckups[bookedCheckups.length -1].patientId,
               assignedDoctor: bookedCheckups[bookedCheckups.length -1].assignedDoctor,
               doctorSpeciality: bookedCheckups[bookedCheckups.length -1].doctorSpeciality,
               doctorId: bookedCheckups[bookedCheckups.length -1].doctorId,
               date: date,
               reason: reason,
               day: day
          }    

          // let newNewCheckup = {
          //      doctorId = 
          // }

          bookedCheckups[bookedCheckups.length -1] = newCheckup;
          localStorage.setItem('booked checkups', JSON.stringify(bookedCheckups));
     }

     closeCheckupLightbox();
     closeDoctorsLightbox();
     closeAllPatientsLightbox();
}

function acceptAppointment(e) {
     console.log('run');
     
     let doctorIndex = parseInt(e.target.parentNode.parentNode.id);
     let pendingAppointmens = JSON.parse(localStorage.getItem('pending appointments'));
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let localPatients = JSON.parse(localStorage.getItem('patients'));
     let approved;
     let index; 

     for(let i = 0; i < localPatients.length; i++) {

          if(localPatients[i].userId == pendingAppointmens[patientIndex].patientId) {
               index = i;
          }
     }

     let approvedAppointment = {
          patientName: localPatients[index].name,
          patientId: pendingAppointmens[patientIndex].patientId,
          assignedDoctor: localDoctors[doctorIndex].name,
          date: pendingAppointmens[patientIndex].date,
          day: pendingAppointmens[patientIndex].day,
          doctorId: localDoctors[doctorIndex].userId,
          reason: pendingAppointmens[patientIndex].reason
     }

     if(localStorage.getItem('approved appointments') == null) {
          approved = [];
     } else {
          approved = JSON.parse(localStorage.getItem('approved appointments'))
     }

     approved.push(approvedAppointment);
     localStorage.setItem('approved appointments', JSON.stringify(approved));

     let filtered = pendingAppointmens.filter(function(appointment, i) {
          console.log(appointment, i )

          return patientIndex != i;
     })

     console.log(filtered);
     localStorage.setItem('pending appointments', JSON.stringify(filtered));
     closeDoctorsLightbox();
     window.location.reload();
}

function denyAppointment(e) {
     patientIndex = parseInt(e.target.parentNode.parentNode.id);
     console.log(patientIndex);
     let pendingAppointmens = JSON.parse(localStorage.getItem('pending appointments'));
     console.log(pendingAppointmens[patientIndex])

     var filtered = pendingAppointmens.filter(function(appointment, i) {
          return patientIndex != i
     })

     localStorage.setItem('pending appointments', JSON.stringify(filtered));
     window.location.reload();
}

function signOut() {
     let status = confirm('are you sure you want to sign out?')
     if(status == true) {
          window.location.href = 'hosp.html';
     } 
}

function displayAllDoctors() {
     let doctorsUl = document.querySelector('.doctors-details');
     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let doctorsList = document.querySelector('.all-doctors');

     // HIDE EVERYTHING AND JUST SHOW ALL THE PATIENTS
          hospitalForm.style.display = 'none';
          hospProfile.style.display = 'none';
          calendarDays.style.display = 'none';
          patientsList.style.display = 'none';
          hideHospProfile();
          doctorsList.style.display = 'block';
          mainNavigation.style.left = '-100%';

     localDoctors.forEach(function(doctor, i) {
          doctorsUl.innerHTML = '';
     })

     localDoctors.forEach(function(doctor, i) {
          doctorsUl.innerHTML += `<li id="${i}">
                              <div class="doctor-stuff">
                                   <h5>Name: ${doctor.name.toUpperCase()}</h5>
                                   <h5>Email: ${doctor.email}</h5>
                                   <h5>User Id: ${doctor.userId}</h5>
                              </div>
                         </li>`
     })
}

function displayDoctorDetails() {
     let currentUser = getCurrentUser();
     let doctorName = document.querySelector('.doctor-name');
     let doctorDp = document.querySelector('.doctor-dp');

     // DISPLAY THE DOCTORS NAME
     doctorName.textContent = currentUser.name.toUpperCase();
     var x = currentUser.name.split(' ');

     // DISPLAY THE DOCTORS DP
     doctorDp.src = `images/${x[0]}.jpg`;
}

function displayAllPatients() {
     let patientsUl = document.querySelector('.patients-details');
     let localPatients = JSON.parse(localStorage.getItem('patients'));
     let patientsList = document.querySelector('.all-patients');

     // HIDE EVERYTHING AND JUST SHOW ALL THE PATIENTS
     hospitalForm.style.display = 'none';
     calendarDays.style.display = 'none';
     doctorsList.style.display = 'none';
     hideHospProfile();
     patientsList.style.display = 'block';
     mainNavigation.style.left = '-100%';

     localPatients.forEach(function(patient, i) {
          patientsUl.innerHTML += `<li id="${i}">
                              <div class="patient-stuff">
                                   <h5>Name: ${patient.name}</h5>
                                   <h5>Email: ${patient.email}</h5>
                                   <h5>User Id: ${patient.userId}</h5>
                              </div>
                         </li>`
     })
}

function showRegisterHospitalForm() {
     let hospitalForm = document.querySelector('.hospital-setup-form'); 

     // HIDE EVERYTHING AND JUST SHOW ALL THE PATIENTS
     calendarDays.style.display = 'none';
     hospitalForm.style.display = 'block';
     hospProfile.style.display = 'none';
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

     if(hospDetails != null ) {
          hospName.textContent = hospDetails.name;
          hospEmail.textContent = hospDetails.email;
          hospAddress.textContent = hospDetails.address;
          hospNumber.textContent = hospDetails.number;
          hospCity.textContent = hospDetails.city;
          hospCountry.textContent = hospDetails.country;
          hospProvince.textContent = hospDetails.province;
          hospCode.textContent = hospDetails.zipCode;
     }
}

function showAllPatients() {
     console.log('hurt');
     
}
// SHOW THE CURRENT DOCTOR ALL HIS APPOINTMENTS LINED UP
// function saveDoctorsAppointments() {
//      let currentUser = getCurrentUser();
//      let localDoctors;
//      let newAppointment;

//      if(localStorage.getItem('approved appointments') != null) {
//           acceptAppointments = JSON.parse(localStorage.getItem('approved appointments'));

//           acceptAppointments.forEach(function(appointment, i) {
//                localDoctors = JSON.parse(localStorage.getItem('doctors'));

//                if(currentUser.userId == appointment.doctorId) {
//                     appointmentIndex = i;
//                     newAppointment = {
//                          patientName: appointment.patientName,
//                          patientId: appointment.patientId,
//                          date: appointment.date
//                     }

//                     localDoctors.forEach(function(doctor) {
//                          console.log(doctor);
//                          doctor.appointment.push(newAppointment);
//                     })
                    
//                     console.log(localDoctors);
//                }
//           })
//           localStorage.setItem('doctors', JSON.stringify(localDoctors));
//      }
// }

function showDoctorsAppointments() {
     let currentUser = getCurrentUser();
     let acceptedAppointments;
     let day; 
     console.log('nah bru');

     
     if(localStorage.getItem('approved appointments') != null) {
          acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));

          acceptedAppointments.forEach(function(appointment) {

               if(currentUser.userId == appointment.doctorId) {
                    day = parseInt(appointment.day);
                    document.getElementById(`${day}`).style.backgroundColor = '#00897b';
                    document.getElementById(`${day}`).classList.add('appointment');
                    document.getElementById(`${day}`).classList.remove('book');
               }
          })
     }
}

function showAppointmentInfo(e) {
     let acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));
     let appointmentsUl = document.querySelector('.appointments-ul');
     let individualAppointment = document.querySelector('.view-individual-appointment-lightbox');
     let dayblockId = e.target.id;

     individualAppointment.style.display = 'flex';

     acceptedAppointments.forEach(function(appointment, i) {
          console.log(appointment.day)

          if (parseInt(appointment.day) == parseInt(dayblockId)) {
               console.log('they match');

               // ALL WE GOTTA DO NOW IS PRINT THIS INFO TO THE USER
               console.log(appointment);
               appointmentsUl.innerHTML = `<li>Patient Name: ${appointment.patientName}</li>
                                             <li>Patient Id: ${appointment.patientId}</li>
                                             <li>Date: ${appointment.date}</li>`
          }
     })
}



function closeIndividualAppointmentLightbox() {
     let individualAppointment = document.querySelector('.view-individual-appointment-lightbox');
     individualAppointment.style.display = 'none';
}

function closeCheckupLightbox() {
     let individualAppointment = document.querySelector('.book-checkup-lightbox');
     individualAppointment.style.display = 'none';
}

function closeAllPatientsLightbox() {
     let individualAppointment = document.querySelector('.view-all-patients-lightbox');
     individualAppointment.style.display = 'none';
}

function editProfile() {
     document.querySelector('.edit-profile-btn').style.display = 'none'; 
     let hiddenInputs = document.querySelectorAll('.hidden');
     let saveBtnContainer = document.querySelector('.save-btn-container');
     saveBtnContainer.style.display = 'block';
     let editBtnContainer = document.querySelector('.edit-btn-container');
     editBtnContainer.style.display = 'none';

     hiddenInputs.forEach(function(input, i) {
          input.style.display = 'flex';
     })
}

function saveProfile() {
     let email = document.querySelector('.doctor-email');
     let emailText = document.querySelector('#email');
     
     let speciality = document.querySelector('.doctor-speciality');
     let specialityText = document.querySelector('#speciality');

     let cellphone = document.querySelector('.doctor-cellphone');
     let cellphoneText = document.querySelector('#cellphone');

     let faxNumber = document.querySelector('.doctor-fax-number');
     let faxNumberText = document.querySelector('#fax-number');

     let address = document.querySelector('.doctor-address');
     let addressText = document.querySelector('#address');


     let localDoctors = JSON.parse(localStorage.getItem('doctors'));
     let currentUser = getCurrentUser();
     let doctorIndex;
     
     localDoctors.forEach(function(doctor, i) {

          if(doctor.userId == currentUser.userId) {
               doctorIndex = i;
          }
     })
     
     let doctorDetails = {
          name: localDoctors[doctorIndex].name,
          password: localDoctors[doctorIndex].password,
          userId: localDoctors[doctorIndex].userId,
          email: email.value,
          speciality: speciality.value,
          cellphone: cellphone.value,
          faxNumber: faxNumber.value,
          address: address.value
     }

     let filtered = localDoctors.filter(function(doctor, i) {
          return doctorIndex != i;
     })

     filtered.push(doctorDetails);
     localStorage.setItem('doctors', JSON.stringify(filtered));

     let hiddenInputs = document.querySelectorAll('.hidden');
     hiddenInputs.forEach(function(input, i) {
          input.style.display = 'none';
     })

     emailText.textContent = localDoctors[doctorIndex].email;
     specialityText.textContent = localDoctors[doctorIndex].speciality;
     cellphoneText.textContent = localDoctors[doctorIndex].cellphone;
     faxNumberText.textContent = localDoctors[doctorIndex].faxNumber;
     addressText.textContent =localDoctors[doctorIndex].address;
}















// ALL THE HIDE AND SEEK STUFF 
     // HIDE HOSPITAL PROFILE
     function hideHospProfile() {
          hospProfile.style.display = 'none';
     }
     // SHOW THE HOSPITAL PROFILE
     function showHospProfile() {
          hideCalendar();
          hideDoctorsInfo();
          hideHospRegForm();
          hidePatientsList();
          hideDoctorsList();

          hospProfile.style.display = 'block';
          closeMenu();
     }


     // HIDE HOSPITAL REGISTRATION FORM
     function hideHospRegForm() {
          hospitalForm.style.display = 'none';
     }
     // SHOW HOSPITAL REGISTRATION FORM
     function showHospRegForm() {
          hideHospProfile();
          hideDoctorsInfo();
          hideCalendar();
          hidePatientsList();
          hideDoctorsList();

          hospitalForm.style.display = 'block';
          closeMenu();
     }     


     // HIDE DOCTORS INFO
     function hideDoctorsInfo() {
          doctorsInfo.style.display = 'none';
     }
     function hideDoctorsList() { }
     // SHOW DOCTORS INFO
     function showDoctorsInfo() {
          hideHospProfile();
          hideDoctorsInfo();
          hideCalendar();
          hidePatientsList();
          hideHospRegForm();

          doctorsInfo.style.display = 'block';
          closeMenu();
     }     
     


     // HIDE CALENDAR
     function hideCalendar() {
          calendarDays.style.display = 'none';
     }    
      // SHOW THE CALENDAR
     function showCalendar() {
          hideHospProfile();
          hideDoctorsInfo();
          hideHospRegForm();
          hidePatientsList();
          hideDoctorsList();


          calendarDays.style.display = 'block';
          closeMenu();
     }


     // HIDE THE LIST OF PATIENTS
     function hidePatientsList() {
          patientsList.style.display = 'none'; 
     }

     // HIDE THE LIST OF DOCTORS
     function hideDoctorsList() {
          doctorsList.style.display = 'none';
     }


function showPatientsLightbox(e) {
     day = e.target.id;
     let lightbox = document.querySelector('.view-all-patients-lightbox');
     let localPatients = JSON.parse(localStorage.getItem('patients'));
     let patientsUl = document.querySelector('.patients');

     lightbox.style.display = 'flex';

     localPatients.forEach(function(patient, i) {
          patientsUl.innerHTML = '';
     })

     localPatients.forEach(function(patient, i) {
          patientsUl.innerHTML += `<li id="${i}">
                                             <h6>Patient Name: ${patient.name}</h6>
                                             <a href="#" id="${i}" class="btn set-checkup">SET CHECKUP</a>
                                   </li>`
     })

}
    
function showCheckupForm(e) {
     let lightbox = document.querySelector('.book-checkup-lightbox');
     lightbox.style.display = 'flex';
     lightbox.style.zIndex = 9;

     doctorIndex = e.target.id;
}


function showCheckups() {
     console.log('jhgf');
     
     let dayblocks = document.querySelectorAll('.day-block');
     let currentUser = getCurrentUser();
     let bookedCheckups;

     if(localStorage.getItem('booked checkups') != null ) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));
          
          bookedCheckups.forEach(function(checkup, i) {
               console.log(currentUser.userId);
               console.log(checkup.doctorId);

               if(currentUser.userId == checkup.doctorId) {
                    console.log(checkup);     
                    
                    document.getElementById(parseInt(checkup.day)).classList.add('checkup');
                    document.getElementById(parseInt(checkup.day)).classList.remove('book');
               }
          })
     }     
}

function populateTheCheckupDetails() {
     let dayblocks = document.querySelectorAll('.day-block');
     let checkupUl = document.querySelector('.checkup-details');
     let currentUser = getCurrentUser();
     let bookedCheckups; 

     if(localStorage.getItem('booked checkups') != null) {
          bookedCheckups = JSON.parse(localStorage.getItem('booked checkups'));

          bookedCheckups.forEach(function(checkup, i) {
               if(currentUser.userId == checkup.doctorId) {
                    dayblocks.forEach(function(block, l) {
                         if(block.id == parseInt(checkup.day)) {
                              console.log(block.id);
                              console.log(i);
                              checkupUl.innerHTML += `<li>
                                                            <h4>${checkup.assignedDoctor}</h4>
                                                       </li>`
                         }
                    })
               }
          })
     }
}

function showCheckupLightbox() {
     let lightbox = document.querySelector('.view-checkup-lightbox');
     lightbox.style.display = 'flex';
}

function closeLCheckboxightbox() {
     let lightbox = document.querySelector('.view-checkup-lightbox');
     lightbox.style.display = 'flex';
}