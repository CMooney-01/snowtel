import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginFormValidator } from '../../utils/useLoginFormValidator';
import styles from './styles.module.css';

export const ContactInfoForm = (props) => {
  //Passed in from Payment.js
  const { checkIn, checkOut, bookingDates, roomCapacity } = props.props;
  // On successful booking server response will be data = { bookingId, status: 200, message: "Success" }
  // On failed booking server response will be data = { status: 500, message: "" }, message will indicate which query failed on server side
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    roomCapacity: roomCapacity,
    bookingDates: bookingDates,
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  const navigate = useNavigate();
  const navigateSuccess = (data) => {
    navigate('/success', {state: {data}});
  }
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(updatedForm);
    if (errors[field]?.dirty)
      validateForm({
        form: updatedForm,
        errors,
        field,
      });
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"formData": form}),
    };

    console.log(form);
    
    fetch("/banana", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        if (data?.status === 200) {
          console.log(data);
          setLoading(false);
          navigateSuccess(data);
        }
      });
    //If server responds with success data, send to successful booking page


    setLoading(false);
    console.log(data);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h3>Booking Details:</h3>
      <div className={styles.customerInfo}>
        {/* Name field */}
        <label htmlFor='contactName'>Name*</label>
        <input
          type='contactName'
          name='contactName'
          aria-label='Name field'
          className={errors.contactName.error ? styles.invalidField : ''}
          value={form.contactName}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        <p className={errors.contactName.error ? styles.invalidFieldPrompt : styles.hidden}>{errors.contactName.message}</p>
        {/* Email field */}
        <label htmlFor='contactEmail'>Email*</label>
        <input
          type='contactEmail'
          name='contactEmail'
          aria-label='Email field'
          className={errors.contactEmail.error ? styles.invalidField : ''}
          value={form.contactEmail}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />    
        <p className={errors.contactEmail.error ? styles.invalidFieldPrompt : styles.hidden}>{errors.contactEmail.message}</p>
        {/* Phone field */}
        <label htmlFor='contactPhone'>Phone Number</label>
        <input
          type='contactPhone'
          name='contactPhone'
          aria-label='Phone number field'
          value={form.contactPhone}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
      </div>
      
      <div className={styles.customerDates}>
        Your selected dates:
        <div className={styles.confirmationDate}>
          <h5>Check In: {new Date(checkIn).toDateString()}</h5>
        </div>
        <div className={styles.confirmationDate}>
          <h5>Check Out: {new Date(checkOut).toDateString()}</h5>
        </div>
      </div>
  
      <div>
        <button type="submit" style={{marginBottom:'20px'}}>Book my stay!</button>
      </div>

      <div className={loading ? styles.hidden : ''}>
        {data?.message}
      </div>
    </form>
  )

}

export default ContactInfoForm;