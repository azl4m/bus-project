function calculateArrivalTime(departureTime, delay) {
    // Parse the departure time
    const [hours, minutes] = departureTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
  
    // Add the delay
    const arrivalMinutes = totalMinutes + delay;
  
    // Calculate new hours and minutes
    const arrivalHours = Math.floor(arrivalMinutes / 60) % 24; // Keep it within 24 hours
    const arrivalMinutesPart = arrivalMinutes % 60;
  
    // Format the result as HH:mm
    return `${String(arrivalHours).padStart(2, "0")}:${String(arrivalMinutesPart).padStart(2, "0")}`;
  }
  function calculateDuration(startTime, endTime) {
    // Convert times to minutes since midnight
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
  
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    // Calculate the difference in minutes
    let durationMinutes = endTotalMinutes - startTotalMinutes;
  
    // Handle cases where the end time is on the next day
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60; // Add 24 hours in minutes
    }
  
    // Convert back to HH:mm format
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
  
    return {
      formatted: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`, // HH:mm format
    };
  }

  module.exports={
    calculateArrivalTime,
    calculateDuration
  }