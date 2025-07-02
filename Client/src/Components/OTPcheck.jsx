import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';

function OTPcheck() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [otp, setOtp] = useState(['', '', '', '']);

  const handelKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      document.getElementById(`otp-${i - 1}`).focus();
    }
  };

  const handelChange = (e, i) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {  // allow only single digit number or empty string
      const newOTP = [...otp];
      newOTP[i] = value;
      setOtp(newOTP);

      if (value && i < otp.length - 1) {
        document.getElementById(`otp-${i + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    const user = await useUserStore.getState().OTPverify(id, enteredOTP);
    if( user ) {
        navigate('/')
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="px-10 py-5 rounded-xl bg-zinc-800">
        <form onSubmit={handleSubmit}>
          <section className="flex justify-between gap-3">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={otp[index]}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={1}
                  onChange={(e) => handelChange(e, index)}
                  onKeyDown={(e) => handelKeyDown(e, index)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                />
              ))}
          </section>

          <button
            type="submit"
            className="bg-blue-500 w-full mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTPcheck;
