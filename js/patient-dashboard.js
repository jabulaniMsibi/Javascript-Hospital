window.addEventListener('DOMContentLoaded', function() {
    let toBeDecoded = window.location.search;
    let userId = toBeDecoded.substring(1, toBeDecoded.length);
    console.log(userId);

    displayApprovedAppointments();
    displayPendingAppointments();
    displayPatientDetails();
    displayAcceptedAppointmentInfo();
    // displayDoctorsInfo();
    displayTasks();

    // DISPLAY HOSPITAL INFO
    const showHospitalInfoBtn = document.querySelector('.view-hospital-btn');
    showHospitalInfoBtn.addEventListener('click', showHospitalInfo);
})

// OPEN AND CLOSE MENU FUNCTIONS
    // OPEN MENU FUNCTION
    // CLOSE MENU FUNCTION
    
// HIDE EVERYTHING AND DISPLAY RELEVANT INFORMATION
    // HIDE EVERYTHING AND DISPLAY DOCTORS INFO
    // HIDE EVERYTHING AND DISPLAY PATIENTS INFO
    // HIDE EVERYTHING AND DISPLAY CALENDAR

// APPOINTMENT AND CHECKUP LIGHTBOX DISPLAY

// HIDE ALL LIGTHBOXES
    // APPOINTMENT LIGHTBOX HIDE
    // CHECKUP LIGHTBOX HIDE
    // BOOK APPOINTMENT LIGHTBOX HIDE

// DAILY DUTIES FUNCTIONALITY

// DISPLAY LOCAL STORAGE ITEMSD ON LOAD

// SAVE HOSPITAL INFO

// BOOK APPOINTMENT FUNCTIONALITY

// DISPLAY APPROVED APPOINTMENTS


let toBeDecoded = window.location.search;
let userId = toBeDecoded.substring(1, toBeDecoded.length);

// ------------------------------ OPEN AND CLOSE MENU FUNCTIONS ------------------------------
const openMenuBtn = document.querySelector('.open-menu-container');
const closeMenuBtn = document.querySelector('.close-menu-btn-container');
const mainNavigation = document.querySelector('.main-navigation');
// ------------------------------ OPEN MENU FUNCTION ------------------------------
openMenuBtn.addEventListener('click', openMenu);
function openMenu() {
    
     mainNavigation.style.left = '-15px';
}

// ------------------------------ CLOSE MENU FUNCTION ------------------------------
closeMenuBtn.addEventListener('click', closeMenu);
function closeMenu() {
     mainNavigation.style.left = '-100%';
}




// ------------------------ HIDE EVERYTHING AND DISPLAY THE RELEVANT INFORMATION ------------------------
const ProfileSetup = document.querySelector('.setup-profile');
const calendarDays = document.querySelector('.days');
const patientInfo = document.querySelector('.patient-info');
const doctorInfo = document.querySelector('.doctor-info');
const patientReg = document.querySelector('.patient-registration');

// ------------------------ HIDE EVERYTHING AND DISPLAY DOCTORS INFO ------------------------
const viewDoctorBtn = document.querySelector('.view-doctor');

viewDoctorBtn.addEventListener('click', function() {
     patientReg.style.display = 'none';
     patientInfo.style.display = 'none';
     calendarDays.style.display = 'none';
     doctorInfo.style.display = 'block';
    
    mainNavigation.style.left = '-100%';
})

// ------------------------ HIDE EVERYTHING AND DISPLAY PATIENTS INFO ------------------------
const viewPatienBtn = document.querySelector('.view-patient');

viewPatienBtn.addEventListener('click', function() {
     patientReg.style.display = 'none';
     calendarDays.style.display = 'none';
     doctorInfo.style.display = 'none';
     patientInfo.style.display = 'block';
    
    mainNavigation.style.left = '-100%';
})

// ------------------------ HIDE EVERYTHING AND DISPLAY PROFILE INFO ------------------------
const viewProfileBtn = document.querySelector('.view-profile');

viewProfileBtn.addEventListener('click', function() {
     calendarDays.style.display = 'none';
     doctorInfo.style.display = 'none';
     patientInfo.style.display = 'block';
    
    mainNavigation.style.left = '-100%';
})

// ------------------------ HIDE EVERYTHING AND DISPLAY CALENDAR ------------------------
const viewAppointmentsBtn = document.querySelector('.view-appointments');

viewAppointmentsBtn.addEventListener('click', function() {
     patientReg.style.display = 'none';
     doctorInfo.style.display = 'none';
     patientInfo.style.display = 'none';   
    calendarDays.style.display = 'flex';

    mainNavigation.style.left = '-100%';
})




// ------------------------ APPOINTMENT AND CHECKUP LIGHTBOX DISPLAY ------------------------
const dayBlock = document.querySelectorAll('.day-block');
dayBlock.forEach(function(block) {
    block.addEventListener('click', function(e) {
         console.log(e.target.className)
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




// ------------------------ HIDE ALL THE LIGHTBOXES ------------------------
// ------------------------ APPOINTMENT LIGHTBOX HIDE ------------------------
const closePendingLightboxBtn = document.querySelector('.close-pending-lightbox');
closePendingLightboxBtn.addEventListener('click', closePendingLightbox);

function closePendingLightbox() {
    let pendingLightbox = document.querySelector('.view-pending-appointment-lightbox');
        pendingLightbox.style.display = 'none';
}
// ------------------------ APPOINTMENT LIGHTBOX HIDE ------------------------
const closeAppointmentLightboxBtn = document.querySelector('.close-lightbox');
closeAppointmentLightboxBtn.addEventListener('click', closeAppointmentLightbox);

function closeAppointmentLightbox() {
    let appointmentLightbox = document.querySelector('.view-appointment-lightbox');
        appointmentLightbox.style.display = 'none';
}


// ------------------------ CHECKUP LIGHTBOX HIDE ------------------------
const closeCheckupLightboxBtn = document.querySelector('.close-checkup-lightbox');
closeCheckupLightboxBtn.addEventListener('click', closeCheckupLightbox);

function closeCheckupLightbox() {
    let checkupLightbox = document.querySelector('.view-checkup-lightbox');
        checkupLightbox.style.display = 'none';
}


// ------------------------ BOOK APPOINTMENT LIGHTBOX HIDE ------------------------
const closeBookingLightboxBtn = document.querySelector('.close-booking-lightbox');
closeBookingLightboxBtn.addEventListener('click', closeBookingLightbox);

function closeBookingLightbox() {
    let checkupLightbox = document.querySelector('.book-appointment-lightbox');
        checkupLightbox.style.display = 'none';
}



// ------------------------ DAILY DUTIES FUNCTIONALITY ------------------------
const taskNameInput = document.querySelector('.task-name');
const taskDescriptionInput = document.querySelector('.task-description');
const saveTaskBtn = document.querySelector('.add-task');

saveTaskBtn.addEventListener('click', saveNewTask);

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

// ------------------------ DISPLAY THE TASKS ------------------------
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




// ------------------------ DISPLAY LOCAL STORAGE ITEMS ON LOAD ------------------------
window.addEventListener('load', displayLocalStorageItems);

function displayLocalStorageItems() {
    let newTaskList = document.querySelector('.tasks');
    let taskListHeading = document.querySelector('.tasklist-heading');

    if(localStorage.getItem('tasks') != null) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
    
        tasks.forEach(function(task) {
            taskListHeading.style.display = 'block';
            newTaskList.innerHTML += `<li>${task.taskName}</li>`;
        })
    }

    if(localStorage.getItem('hospital') != null) {
        let hospitalName = document.querySelector('.hospital-name');
        let hospitalDetails = JSON.parse(localStorage.getItem('hospital'));
        hospitalName.textContent = hospitalDetails[0].name;
    }

    if(localStorage.getItem('user details') != null) {
        let userDetails = JSON.parse(localStorage.getItem('user details'));
        let reasonForVisitText = document.querySelector('#reason');
        let admissionDateText = document.querySelector('#a-date');
        let dischargeDateText = document.querySelector('#d-date');
        let cellNumberText = document.querySelector('#cell-number');
        let faxNumberText = document.querySelector('#fax-number');
        let patientAddressText = document.querySelector('#address');
    
        reasonForVisitText.textContent = userDetails.reasonForVisit;
        admissionDateText.textContent = userDetails.admissionDate;
        dischargeDateText.textContent = userDetails.dischargeDate;
        cellNumberText.textContent = userDetails.cellNumber;
        faxNumberText.textContent = userDetails.faxNumber;
        patientAddressText.textContent = userDetails.patientAddress;
    }
}


// ------------------------ SAVE HOSPITAL INFO ------------------------
const hospNameInput = document.querySelector('.hospital-names');
const hospEmailInput = document.querySelector('.hospital-email');
const hospAddressInput = document.querySelector('.hospital-address');
const hospNumberInput = document.querySelector('.hospital-number');
const hospRegisterBtn = document.querySelector('.register-hospital-btn');


// ------------------------ BOOK APPOINTMENT FUNCTIONALITY ------------------------
const ShowbookAppointmentBtn = document.querySelector('.book-appointment-btn');

ShowbookAppointmentBtn.addEventListener('click', ShowbookAppointmentForm);
function ShowbookAppointmentForm() {
    let checkupLightbox = document.querySelector('.book-appointment-lightbox');
    checkupLightbox.style.display = 'flex';

    bookAppointment();
}
const submitAppointmentBtn = document.querySelector('.submit-appointment-btn');

submitAppointmentBtn.addEventListener('click', bookAppointment);
function bookAppointment(e) {
    e.preventDefault();
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

        if(appointmentDay[0] == 0)
        {
        
            document.getElementById(appointmentDay[1]).style.backgroundColor = 'grey';
            document.getElementById(appointmentDay[1]).classList.add('pending');
            document.getElementById(appointmentDay[1]).classList.remove('book')
            console.log(document.getElementById(appointmentDay[1]).classList)
        } else if (appointmentDay[0] == 1) 
        {
        
            document.getElementById(1 + appointmentDay[1]).style.backgroundColor = 'grey';
            document.getElementById(1 + appointmentDay[1]).classList.add('pending');
            document.getElementById(1 + appointmentDay[1]).classList.remove('book'); 
            console.log(document.getElementById(1 + appointmentDay[1]).classList)
        } else if (appointmentDay[0] == 2) 
        {
        
            document.getElementById(2 + appointmentDay[1]).style.backgroundColor = 'grey';
            document.getElementById(2 + appointmentDay[1]).classList.add('pending');
            document.getElementById(2 + appointmentDay[1]).classList.remove('book');
            console.log(document.getElementById(appointmentDay[1]).classList)
        } else {
        
            document.getElementById(3 + appointmentDay[1]).style.backgroundColor = 'grey';
            document.getElementById(3 + appointmentDay[1]).classList.add('pending');
            document.getElementById(3 + appointmentDay[1]).classList.remove('book');
            console.log(document.getElementById(3 + appointmentDay[1]).classList)
        }

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
}



// ------------------------------ GET THE CURRENT USER ------------------------------
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


// ------------------------ DISPLAY THE APPROPRIATE PROFILE PICTURE BASED ON USER ------------------------
function diplayProfilePicture() {
    let img = document.querySelector('.doctor-dp');
    let currentUser = getCurrentUser();
    img.src = '/images/' + currentUser.name + '.jpg';

    let doctorName = document.querySelector('.doctor-name');
    doctorName.textContent = currentUser.name;
}

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


// SIGN OUT
const signtOutBtn = document.querySelector('.sign-out-btn');
signtOutBtn.addEventListener('click', signOut);

function signOut() {
    let status = confirm('are you sure you want to sign out?')
    if(status == true) {
         window.location.href = 'hosp.html';
    } else {
        //  window.location.reload();
    }
}

const editBtn = document.querySelector('.edit-btn');
editBtn.addEventListener('click', editProfile);

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

    editBtn.style.display = 'none';
    saveBtnContainer.style.display = 'flex';
}

const saveBtn = document.querySelector('.save-btn');
saveBtn.addEventListener('click', saveProfile);

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
    reason.textContent = reasonValue; 
    number.textContent = numberValue; 
    faxNumber.textContent = faxNumberValue;
    address.textContent = addressValue;
    bloodGroup.textContent = selectedBloodGroupValue;

    hiddenInputs.forEach(function(input) {
        input.style.display = 'none';
    })

    saveBtn.style.display = 'none';
    editBtn.style.display = 'block';
}

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

function displayAcceptedAppointmentInfo() {
    let patientName = document.querySelector('.patients-name');
    let patientId = document.querySelector('.patients-id');
    let patientReason = document.querySelector('.patients-reason');
    let patientDoctor = document.querySelector('.patients-doctor');
    let currentUser = getCurrentUser(); 
    let acceptedAppointments;
    let localDoctors; 

    if(localStorage.getItem('approved appointments') != null) {
        acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));
        localDoctors = JSON.parse(localStorage.getItem('doctors'));

        acceptedAppointments.forEach(function(appointment, i) {

            if(appointment.patientId == currentUser.userId) {

                patientName.textContent = `Patient Name: ${appointment.patientName}`;
                patientId.textContent = `Patient Id: ${appointment.patientId}`;
                patientDoctor.textContent = `Assigned Doctor: ${appointment.assignedDoctor}`;
                patientDoctor.setAttribute('id', i);
            }
        })
    }
 }

function displayDoctorsInfo() {
    let name = document.querySelector('.doctors-name');
    let department = document.querySelector('.doctors-department');
    let speciality = document.querySelector('.doctors-speciality');
    let dp = document.querySelector('.doctors-dp');
    let localDoctors = JSON.parse(localStorage.getItem('doctors'));
    let acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));
    let doctorIndex;
    
    if(acceptedAppointments != null ) {

        if(acceptedAppointments[0].assignedDoctor == currentUser.name) {

            for(let i = 0; i < localDoctors.length; i++) {

                if(acceptedAppointments[0].assignedDoctor == localDoctors[i].name) {

                    doctorIndex = i;
               }
           }
        }
    }

    name.textContent = localDoctors[doctorIndex].name.toUpperCase();
    department.textContent = localDoctors[doctorIndex].department;
    speciality.textContent = localDoctors[doctorIndex].speciality;
         
    var x = localDoctors[doctorIndex].name.split(' ');
    var image = x[0]; // the first name
    // DISPLAY THE DOCTORS DP
    dp.src = `images/.jpg`;


    // if(!localDoctors[doctorIndex].imgSrc) {
    //     dp.src = `images/.jpg`;
    //     //dp.src = `images/${image}.jpg`;

    // } else {
    //     dp.src = `images\h-a-m-a-n-n-8kDx62gZRzk-unsplash-min.jpg`;

    //     for(let i = 0; i < localDoctors.length; i++) {
    //         localDoctors[doctorIndex].imgSrc =  "images\h-a-m-a-n-n-8kDx62gZRzk-unsplash-min.jpg"
    //         dp.src = localDoctors[doctorIndex].imgSrc
    //     }
     // }
}

const cancelBtn = document.querySelector('.cancel-appointment');
cancelBtn.addEventListener('click', cancelAppointment);

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

function showHospitalInfo() {

    populateTheHospProfile();
    let hospitalProfile = document.querySelector('.hospital-profile'); 

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

    hospName.textContent = hospDetails.name;
    hospEmail.textContent = hospDetails.email;
    hospAddress.textContent = hospDetails.address;
    hospNumber.textContent = hospDetails.number;
    hospCity.textContent = hospDetails.city;
    hospCountry.textContent = hospDetails.country;
    hospProvince.textContent = hospDetails.province;
    hospCode.textContent = hospDetails.zipCode;
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

populateProfile();

function showPatientsDoctor() {
    let doctorsName = document.querySelector('.doctors-name');
    let doctorsSpeciality = document.querySelector('.doctors-speciality');
    let currentUser = getCurrentUser();
    let acceptedAppointments = JSON.parse(localStorage.getItem('approved appointments'));

    if(acceptedAppointments != null) {
        acceptedAppointments.forEach(function(appointment, i) {
            if(appointment.userId == currentUser.userId) {

            }
        })
    }
}