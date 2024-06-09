import React, { useState, useEffect, useContext } from "react";
import "../styles/Reservation.css";
import { AuthContext } from "../components/AuthContext";
import Reservation from "../components/Reservation";

function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [reservationDetails, setReservationDetails] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Handle form submission
    const newReservation = new Reservation(
      Date.now(), // Placeholder for reservation ID
      { name, email, phoneNumber: phone }, // Use form data
      formatDate(date),
      formatTime(time),
      numOfPeople,
      tableNumber,
      { restaurantTables: [{ tableNo: tableNumber, status: false }] } // Placeholder for restaurant object
    );
    console.log("New Reservation:", newReservation);
    setReservationDetails(newReservation.generateConfirmation());
    alert("Reservation submitted!");
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const peopleRegex = /^[1-9]$|^10$/;

    if (!nameRegex.test(name)) {
      alert("Name can only contain letters, hyphens, and spaces.");
      return false;
    }
    if (email && !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (phone && !phoneRegex.test(phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!email && !phone) {
      alert("Please provide either an email or phone number.");
      return false;
    }
    if (!peopleRegex.test(numOfPeople)) {
      if (parseInt(numOfPeople, 10) > 10) {
        alert(
          "For reservations of more than 10 people, please call the cafe."
        );
      } else {
        alert("Number of people must be between 1 and 10.");
      }
      return false;
    }
    return true;
  };

  const formatTime = (time) => {
    const [hour, minutes] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12; // Convert to 12-hour format
    return `${hour12}:${minutes} ${period}`;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const generateTimeOptions = () => {
    if (!date) return [];
    const selectedDate = new Date(date);
    const day = selectedDate.getDay();

    // Set opening and closing hours based on day of the week
    const openingHour = day >= 1 && day <= 5 ? 9 : 9; // 9 AM for weekdays and weekends
    const closingHour = day >= 1 && day <= 5 ? 17 : 15; // 5 PM for weekdays, 3 PM for weekends

    const timeOptions = [];
    for (let hour = openingHour; hour < closingHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) { 
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeOptions.push(timeString);
      }
    }
    return timeOptions;
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDate(getTodayDate());
    // Pre-fill form fields if user is logged in
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phoneNumber);
    }
  }, [user]); // Include user in the dependency array

  if (reservationDetails) {
    return (
      <div className="reservation-container">
        <h1 className="reservation-title">Reservation Details</h1>
        <p>
          <strong>Name:</strong> {reservationDetails.customerName}
        </p>
        <p>
          <strong>Email:</strong> {reservationDetails.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {reservationDetails.customerName}
        </p>
        <p>
          <strong>Date:</strong> {reservationDetails.resDate}
        </p>
        <p>
          <strong>Time:</strong> {reservationDetails.resTime}
        </p>
        <p>
          <strong>Number of People:</strong> {reservationDetails.numOfPeople}
        </p>
        <p>
          <strong>Table Number:</strong> {reservationDetails.tableNumber}
        </p>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <h2>Relaxing Koala</h2>
      <h1 className="reservation-title">Make a Reservation</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            min={getTodayDate()}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select Time</option>
            {generateTimeOptions().map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {formatTime(timeOption)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numOfPeople">Number of People:</label>
          <input
            type="number"
            id="numOfPeople"
            value={numOfPeople}
            onChange={(e) => setNumOfPeople(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number:</label>
          <input
            type="number"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;