const Input = ({ placeholder, name, handleInput }) => {

  return (
    <div>
      <input
        name={name}
        className='input-field'
        placeholder={placeholder}
        onChange={handleInput}
      />
    </div>
  );
};

export default Input;