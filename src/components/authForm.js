export default ({alias, password, errorMessage, onChange, onSubmit}) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>User Alias:</label>
        <input className="form-control" type='text' name='alias' onChange={onChange} />
      </div>
      <div>
        <label>Password:</label>
        <input className="form-control" type='password' name='password' onChange={onChange} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </div>
      <small style={{color: 'red'}}>{errorMessage}</small>
    </form>
  )
}