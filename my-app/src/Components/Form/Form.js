import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [showComponent, setShowComponent] = useState(true);
  const [showOtherInput, setShowOtherInput] = useState(false); 


   useEffect(() => {
    // Trigger the component appearance after 5 seconds
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 5000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

    const handleActivityChange = (activity) => {
    if (activity === 'other') {
      // If "Other" is selected, show the input box
      setShowOtherInput(!showOtherInput);
    }

    const isSelected = selectedActivities.includes(activity);

    if (isSelected) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSkip = () => {
    setShowComponent(false);
  };

  const handleSubmit = () => {
    if (selectedActivities.length > 0) {
      alert('Thanks for submitting!');
      setShowComponent(false); // Hide the component after submitting
    }
  };

const dimBackgroundStyle = {
  background: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: showComponent ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out',
};

const formStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
  textAlign: 'left', // Align text to the left
  width: '400px', // Set a fixed width
  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
  transform: showComponent ? 'translateY(0)' : 'translateY(100px)', // Slide in from the bottom
  opacity: showComponent ? 1 : 0,
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: '16px', // Add some spacing above the list
};

const listItemStyle = {
  marginBottom: '12px', // Add spacing between list items
};

const checkboxStyle = {
  display: 'none', // Hide default checkbox
};

const customCheckboxStyle = {
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  border: '2px solid #4285F4',
  display: 'inline-block',
  position: 'relative',
  marginRight: '8px',
  background: 'white', // Set the background color to white initially
};

const customCheckmarkStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: '#4285F4',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'none',
};

const labelStyle = {
  cursor: 'pointer',
};

  const renderActivityCheckbox = (activity, label) => (
    <li style={listItemStyle} key={activity}>
      <input
        type="checkbox"
        id={activity}
        value={activity}
        onChange={() => handleActivityChange(activity)}
        checked={selectedActivities.includes(activity)}
        style={checkboxStyle}
      />
      <label htmlFor={activity} style={labelStyle}>
        <div
          style={Object.assign(
            {},
            customCheckboxStyle,
            selectedActivities.includes(activity) && { background: '#4285F4' }
          )}
        >
          <div
            style={Object.assign({}, customCheckmarkStyle, {
              display: selectedActivities.includes(activity) ? 'block' : 'none',
            })}
          ></div>
        </div>
        {label}
        {activity === 'other' && showOtherInput && (
          <input
            type="text"
            placeholder="Specify other activity"
            style={{ marginLeft: '10px' }}
          />
        )}
      </label>
    </li>
  );


    const fadeInAnimation = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }`;

    // Add the fadeInAnimation to the head of the document
    const styleTag = document.head.appendChild(document.createElement('style'));
    styleTag.textContent = fadeInAnimation;

return showComponent ? (
    <div className="form-container show" style={dimBackgroundStyle}>
            <div style={formStyle}>
                <h2>What do you want to play this weekend?</h2>
                <ul style={listStyle}>
                {renderActivityCheckbox('cricket', 'Cricket')}
                {renderActivityCheckbox('football', 'Football')}
                {renderActivityCheckbox('volleyball', 'Volleyball')}
                {renderActivityCheckbox('badminton', 'Badminton')}
                {renderActivityCheckbox('tennis', 'Tennis')}
                {renderActivityCheckbox('rugby', 'Rugby')}
                {renderActivityCheckbox('other', 'Other (Please specify)')}
                </ul>
                <button onClick={handleSkip} style={{ marginRight: '10px' }}>
                Skip
                </button>
                <button onClick={handleSubmit} disabled={selectedActivities.length === 0}>
                Submit
                </button>
            </div>
    </div>
  ) : null;
};

export default Form;
