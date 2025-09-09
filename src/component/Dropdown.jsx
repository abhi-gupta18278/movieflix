

const Dropdown = ({ title, options, onoptionChange }) => {
  return (
    <select defaultValue='0'
      onChange={(e) => onoptionChange(e.target.value)}

      className=" px-12 py-2 flex items-center justify-center pl-3  mr-10 rounded-md bg-[#212121] text-white opacity-85 font-semibold  shadow-md 
             border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 
             hover:bg-[#2a2a2a] transition duration-300 cursor-pointer"
    >
      {/* {console.log(onoptionChange)} */}

      <option value="0" disabled>{title}</option>
      {
        options.map((el, idx) => (
          <option key={idx} value={el}>{el.toUpperCase()}</option>
        ))
      }
    </select>

  );
}

export default Dropdown;
