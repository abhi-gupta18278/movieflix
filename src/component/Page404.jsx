import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-black'>
      <i onClick={() => navigate(-1)} className="ri-close-large-line ml-[90%] mt-[20px]cursor-pointer text-3xl ;
       text-zinc-300 hover:text-red-600"></i>
      <div className="bg-black h-[93vh] w-[100%] flex justify-center items-center" >

        <img className="h-[40%]" src='/404.png' alt="Loader" />
      </div>
    </div>
  );
}

export default Page404;
