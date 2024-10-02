// App.js

import React, { useEffect,useState } from "react";
import "./App.css";
import AppointmentForm from "./Components/AppointmentForm";
import AppointmentList from "./Components/AppointmentList";

const App = () => {
	const [appointments, setAppointments] = useState([]);
	const [showAppointments, setShowAppointments] = useState(false);

	// Function to handle notification
	const showNotification = (name) => {
		if (Notification.permission === 'granted') {
		  new Notification('Reminder Alert!', {
			body: name ? name : 'It\'s time for your reminder!',
			});
		} else {
		  console.log('Notification permission denied.');
		}
	};

	const addAppointment = (appointment) => {
		const { name, date } = appointment;
		const currentDate = new Date();
		const selectedDate = new Date(date);

		setAppointments([...appointments, appointment]);

		// Calculate the time difference and set up the notification
		const timeDifference = selectedDate.getTime() - currentDate.getTime();
		console.log(`Reminder set for: ${timeDifference / 1000} seconds later`);
		// Set timeout for showing the notification
		setTimeout(() => {
		console.log(`Showing notification: ${name}`); 
		showNotification(name);
		}, timeDifference);
		
  
	};

	const deleteAppointment = (index) => {
		const deletedAppointments = [...appointments];
		deletedAppointments.splice(index, 1);
		setAppointments(deletedAppointments);
	};

	const editAppointment = (index, editedName, editedDate) => {
		const updatedAppointments = [...appointments];
		updatedAppointments[index] = {
			name: editedName,
			date: editedDate,
		};
		setAppointments(updatedAppointments);
	};

	const clearAppointments = () => {
		setAppointments([]);
	};

	const handleViewReminders = () => {
		setShowAppointments(!showAppointments); // Toggle visibility
	};

	useEffect(() => {
		if (Notification.permission !== 'granted') {
		  Notification.requestPermission().then(permission => {
			if (permission !== 'granted') {
			  alert("You need to allow notifications for this feature to work.");
			}
		  });
		}
	}, []);
	  
	return (
		<div className="main_container">
			
			<AppointmentForm addAppointment={addAppointment} />
			
			{/* Button to toggle appointment view */}
			<button onClick={handleViewReminders}>
      		  {showAppointments ? 'Hide Reminders' : 'View Reminders'}
     		</button>

			{/* Conditionally render the AppointmentList component */}
			{showAppointments && (
				<AppointmentList
				appointments={appointments}
				deleteAppointment={deleteAppointment}
				clearAppointments={clearAppointments}
				editAppointment={editAppointment}
				/>
			)}
		</div>
	);
}

export default App;
