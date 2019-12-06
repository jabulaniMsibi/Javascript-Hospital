// ------------------------ NAVIGATION ------------------------

// CTRL + F == USE TO FIND WHAT YOU LOOKING FOR
//1.) LOG OUT PROMPT
//2.) LEGEND SLIDE
//3.) APPOINTMENT AND CHECKUP LIGHTBOX DISPLAY
//4.) APPOINTMENT LIGHTBOX HIDE
//5.) CHECKUP LIGHTBOX HIDE
//6.) BOOK APPOINTMENT LIGHTBOX HIDE LIGHTBOX HIDE
//7.) DAILY DUTIES FUNCTIONALITY
//8.) DISPLAY TASKS AND HOSPITAL NAME ON LOAD
//9.) SAVE HOSPITAL INFO
//10.) DISPLAY DOCTORS INFO
//11.) DISPLAY PATIENT INFO 
//12.) BOOK APPOINTMENT INFO 
//13.) DISPLAY PROFILE INFO 


const profileContent = document.querySelector('.profile-content');
const profileAction = document.querySelector('.profile-actions');

const menuOptions = document.querySelectorAll('.menu-option');
const legend = document.querySelector('.legend');


// ------------------------ LOG OUT PROMPT ------------------------
// this slides the log out prompt up and down
profileContent.addEventListener('click', function() {
    profileAction.classList.toggle('active');
})


// ------------------------ LEGEND SLIDE ------------------------
// this slides the legend out and in
legend.addEventListener('click', function() {
    legend.classList.toggle('active');
})


// ------------------------ APPOINTMENT AND CHECKUP LIGHTBOX DISPLAY ------------------------
const dayBlock = document.querySelectorAll('.day-block');
dayBlock.forEach(function(block) {
    block.addEventListener('click', function(e) {
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
const addTaskBtn = document.querySelector('.add-task');

addTaskBtn.addEventListener('click', addNewTask);

function addNewTask() {
    let taskName = taskNameInput.value;
    let taskDescription = taskDescriptionInput.value;
    let newTaskList = document.querySelector('.tasks');
    let taskListHeading = document.querySelector('.tasklist-heading');
    let newTask = {
        taskName: taskName,
        taskDescription: taskDescription
    }
    //CHECK IF TASKS ARRAY EXIST IN LOCAL STORAGE ALREADY
    if(localStorage.getItem('tasks') != null)
    {
        //IF IT DOES EXIST THEN GET IT AND PUSH NEW TASK IN IT 
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        //IF IT DOESNT THEN INITIALISE A NEW TASKS ARRAY AND PUSH THE TASK THERE
        let tasks = [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskListHeading.style.display = 'block';
    newTaskList.innerHTML += `<li>${taskName}</li>`;
    window.location.reload();
}


// ------------------------ DISPLAY TASKS AND HOSPITAL NAME ON LOAD ------------------------
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

    if(localStorage.getItem('appointment days') != null) {
        let localAppoiontmentDay = JSON.parse(localStorage.getItem('appointment days'));

        localAppoiontmentDay.forEach(function(localDay) {
            for(let i = 0; i < localAppoiontmentDay.length; i++) {
                if(localDay[i] == 0) {
                    document.getElementById(localDay[1]).style.backgroundColor = '#00897b';
                } else if (localDay[i] == 1) {
                    document.getElementById(1 + localDay[1]).style.backgroundColor = '#00897b';
                } else if (localDay[i] == 2) {
                    document.getElementById(2 + localDay[1]).style.backgroundColor = '#00897b';
                } else if (localDay[i] == 3) {
                    document.getElementById(3 + localDay[1]).style.backgroundColor = '#00897b';
                }
            }            
        })
    }
}


// ------------------------ SAVE HOSPITAL INFO ------------------------
const hospNameInput = document.querySelector('.hospital-name');
const hospEmailInput = document.querySelector('.hospital-email');
const hospAddressInput = document.querySelector('.hospital-address');
const hospNumberInput = document.querySelector('.hospital-number');
const hospRegisterBtn = document.querySelector('.register-hospital-btn');

hospRegisterBtn.addEventListener('click', registerHospital);

function registerHospital(e) {
    //prevent default reload on submition of form
    e.preventDefault();

    let hospName = hospNameInput.value;
    let hospEmail = hospEmailInput.value;
    let hospAddress = hospAddressInput.value;
    let hospNumber = hospNumberInput.value;
    let hospDetails = {
        name: hospName,
        email: hospEmail,
        address: hospAddress,
        number: hospNumber
    }

    if(localStorage.getItem('hospital') != null)
    {
        let hospital = JSON.parse(localStorage.getItem('hospital'));
        hospital.push(hospDetails);
        localStorage.setItem('hospital', JSON.stringify(hospital));
    } else {
        let hospital = [];
        hospital.push(hospDetails);
        localStorage.setItem('hospital', JSON.stringify(hospital));
    }
    window.location.reload();
}

const profileInfo = document.querySelector('.patient-info');
const doctorInfo = document.querySelector('.doctor-info');
const patientInfo = document.querySelector('.patient-info');
const calendarDays = document.querySelector('.days');

// ------------------------ DISPLAY DOCTORS INFO ------------------------
const viewDoctorBtn = document.querySelector('.view-doctor');

viewDoctorBtn.addEventListener('click', viewDoctor);
function viewDoctor() {
    profileInfo.style.display = 'none';
    patientInfo.style.display = 'none';
    calendarDays.style.display = 'none';
    doctorInfo.style.display = 'block';
}


// ------------------------ DISPLAY PATIENT INFO ------------------------
const viewPatientBtn = document.querySelector('.view-patient');

viewPatientBtn.addEventListener('click', viewPatient);
function viewPatient() {
    profileInfo.style.display = 'none';
    calendarDays.style.display = 'none';
    doctorInfo.style.display = 'none';
    patientInfo.style.display = 'block';
}


// ------------------------ DISPLAY PROFILE INFO ------------------------
const viewProfileBtn = document.querySelector('.view-profile');

viewProfileBtn.addEventListener('click', viewProfile);
function viewProfile() {
    doctorInfo.style.display = 'none';
    patientInfo.style.display = 'none';
    calendarDays.style.display = 'none';
    profileInfo.style.display = 'block';
}


// ------------------------ BOOK APPOINTMENT INFO ------------------------
const ShowbookAppointmentBtn = document.querySelector('.book-appointment');

ShowbookAppointmentBtn.addEventListener('click', ShowbookAppointmentForm);
function ShowbookAppointmentForm() {
    let checkupLightbox = document.querySelector('.book-appointment-lightbox');
    checkupLightbox.style.display = 'flex';
}




// ------------------------ BOOK APPOINTMENT ------------------------
const bookAppointmentBtn = document.querySelector('.book-appointment-btn');

bookAppointmentBtn.addEventListener('click', bookAppointment);
function bookAppointment(e) {
    e.preventDefault();
    let appointmentDate = document.querySelector('.book-appointment-date').value;
    let appointmentDay = appointmentDate.substring(8);

    if(appointmentDay[0] == 0)
    {
        document.getElementById(appointmentDay[1]).style.backgroundColor = '#00897b';
    } else if (appointmentDay[0] == 1) 
    {
        document.getElementById(1 + appointmentDay[1]).style.backgroundColor = '#00897b';
    } else if (appointmentDay[0] == 2) 
    {
        document.getElementById(2 + appointmentDay[1]).style.backgroundColor = '#00897b';
    } else {
        document.getElementById(3 + appointmentDay[1]).style.backgroundColor = '#00897b';
    }

    if(localStorage.getItem('appointment days') == null ) {
        let appointmentDays = [];
        appointmentDays.push(appointmentDay);
        console.log(appointmentDays);

        localStorage.setItem('appointment days', JSON.stringify(appointmentDays));
    } else {
        let appointmentDays = JSON.parse(localStorage.getItem('appointment days'));
        appointmentDays.push(appointmentDay);
        console.log(appointmentDays);
        localStorage.setItem('appointment days', JSON.stringify(appointmentDays));
    }
    closeBookingLightbox();
}


// ------------------------ BOOK APPOINTMENT ------------------------
const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn-container');

editBtn.addEventListener('click', editProfile);
function editProfile() {
    let valuesToEdit = document.querySelectorAll('.value-to-edit');
    let inputsToShow = document.querySelectorAll('.hidden');

    console.log(valuesToEdit.length, inputsToShow.length);

    for(var i = 0; i < valuesToEdit.length; i++) {
        valuesToEdit[i].style.display = 'none';
        inputsToShow[i].style.display = 'block';
    }
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';    
}

saveBtn.addEventListener('click', savePatientDetails);
function savePatientDetails() {
    let inputsToShow = document.querySelectorAll('.hidden');
    let valuesToEdit = document.querySelectorAll('.value-to-edit');

    let reasonForVisit = document.querySelector('.visit-reason').value;
    let reasonForVisitText = document.querySelector('#reason');
    
    let admissionDate = document.querySelector('.admit-date').value;
    let admissionDateText = document.querySelector('#a-date');
    
    let dischargeDate = document.querySelector('.discharge-date').value;
    let dischargeDateText = document.querySelector('#d-date');

    let cellNumber = document.querySelector('#cell-number-input').value;
    let cellNumberText = document.querySelector('#cell-number');

    let faxNumber = document.querySelector('#fax-number-input').value;
    let faxNumberText = document.querySelector('#fax-number');

    let patientAddress = document.querySelector('#address-input').value;
    let patientAddressText = document.querySelector('#address');

    reasonForVisitText.textContent = reasonForVisit;
    admissionDateText.textContent = admissionDate;
    dischargeDateText.textContent = dischargeDate;
    cellNumberText.textContent = cellNumber;
    faxNumberText.textContent = faxNumber;
    patientAddressText.textContent = patientAddress;

    let userDetails = {
        reasonForVisit: reasonForVisit,
        admissionDate: admissionDate,
        dischargeDate: dischargeDate,
        cellNumber: cellNumber,
        faxNumber: faxNumber,
        patientAddress: patientAddress
    }

    if(reasonForVisitText != '' & admissionDateText != '' & dischargeDateText != '')
    {
        for(var j = 0; j < valuesToEdit.length; j++) {
            valuesToEdit[j].style.display = 'block';
            inputsToShow[j].style.display = 'none';
        }

    // we wanna replace whatever is inside the object, which is why we dont check if it is empty before setting the new object
    localStorage.setItem('user details', JSON.stringify(userDetails));
    
    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';

    window.location.reload;
    }
}