// AppointmentForm.js

import React, {useState } from "react";

const AppointmentForm = ({ addAppointment }) => {
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	

	const handleSubmit = (e) => {
		e.preventDefault();
		addAppointment({ name, date });
		setName("");
		setDate("");

	};


	return (
		<div className="container">
			<h2>CREATE REMINDER</h2>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-25">
						<label for="fname">Reminder-Description: </label>
					</div>
					<div className=" description col-75">
						<input
							type="text"
							id="fname"
							name="firstname"
							placeholder="Reminder Description.."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-25">
						<label for="fname">Date-Time: </label>
					</div>
					<div className="col-75">
						<input
							id="fname"
							name="firstname"
							type="datetime-local"
							value={date}
							min={new Date().toISOString().slice(0, 16)} // Ensures only future dates are selectable
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<input type="submit" value="Add Reminder" />
				</div>
			</form>
		</div>
	);
}

export default AppointmentForm;
