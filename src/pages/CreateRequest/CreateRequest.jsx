import styles from './CreateRequest.module.css';

const CreateRequest = () => {
    return (
      <div className={styles.container} >
      <form action=''>
        <h1>Create a Document</h1>
        <div className={styles.formGroup}>
       <label className="form-label mt-4" htmlFor="title">Title</label>
         <input type='text' id='title' name='' />

       
        <div className={styles.formGroup}>
        <label className="form-label mt-4" htmlFor="formtype">Form Type</label>
          <select name='' id='form_type'>
            <option disabled defaultValue>
              Select
            </option>
            <option value=''>Option 1</option>
            <option value=''>Option 2</option>
            <option value=''>Option 3</option>
          </select>
          <div className={styles.formGroup}>
          <label className="form-label mt-4" htmlFor="quantity">Quantity</label>
          <select name='' id='quantity'>
            <option value=''>0</option>
            <option value=''>1</option>
            <option value=''>2</option>
            <option value=''>3</option>
          </select>
          <div className={styles.formGroup}>
          <label className="form-label mt-4" htmlFor="purpose">Purpose</label>
          <textarea name='purpose' id='' cols='30' rows='10'></textarea>
          <div className={styles.cta}>
          <button>Submit</button>
        </div>
        </div>
        </div>
       </div>
      </div>
    </form>
  </div>
   );
}

export default CreateRequest;