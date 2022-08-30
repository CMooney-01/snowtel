import { useState } from 'react';
import { useLoginFormValidator } from '../../hooks/useFormValidator';
import styles from './styles.module.css';

export const ContactInfoForm = (props) => {
  //Passed in from Payment.js
  const { checkIn, checkOut, bookingDates } = props;

  const [form, setForm] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    bookingDates: bookingDates,
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

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
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    alert(JSON.stringify(form, null, 2));
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
    </form>
  )

}

export default ContactInfoForm;