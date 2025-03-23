import React, { useState } from "react";

const Availability = () => {
  const [availability, setAvailability] = useState({
    start_time: "",
    end_time: "",
    date: "",
    meal_type: "",
    days: [],
    full_week: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "full_week") {
        setAvailability({ ...availability, full_week: checked, days: checked ? ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] : [] });
      } else {
        let updatedDays = checked
          ? [...availability.days, value]
          : availability.days.filter((day) => day !== value);
        setAvailability({ ...availability, days: updatedDays });
      }
    } else {
      setAvailability({ ...availability, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(availability);

    // Backend ko send karne ka logic yahan add karo
  };

  return (
    <div>
      <h4 className="mb-4 fw-semibold">Add Availability</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4 mb-4">
            <label className="form-label">Start Time</label>
            <input type="time" name="start_time" className="form-control" value={availability.start_time} onChange={handleChange} required />
          </div>
          <div className="col-4 mb-4">
            <label className="form-label">End Time</label>
            <input type="time" name="end_time" className="form-control" value={availability.end_time} onChange={handleChange} required />
          </div>
          <div className="col-4 mb-4">
            <label className="form-label">Date</label>
            <input type="date" name="date" className="form-control" value={availability.date} onChange={handleChange} required />
          </div>
        </div>

       
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="fullWeek" name="full_week" checked={availability.full_week} onChange={handleChange} />
          <label className="form-check-label" htmlFor="fullWeek">
            Same setting for full week
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Availability
        </button>
      </form>
    </div>
  );
};

export default Availability;
