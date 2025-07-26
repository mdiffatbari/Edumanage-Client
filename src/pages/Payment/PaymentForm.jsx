/* import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [classInfo, setClassInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch class data
  useEffect(() => {
    axios.get(`http://localhost:3000/classes/${id}`)
      .then(res => setClassInfo(res.data))
      .catch(err => console.error('Failed to fetch class:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    try {
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        setErrorMsg(error.message);
        setProcessing(false);
        return;
      }

      const response = await axios.post('http://localhost:3000/create-payment', {
        amount: classInfo.price,
        classId: id,
      });

      if (response.data.success) {
        setSuccessMsg('✅ Payment completed successfully!');
        console.log('[Mock Payment]', response.data.payment);

        // Increase enrolled count for the class
        await axios.patch(`http://localhost:3000/classes/${id}/enroll`);

        // Create or update user with student role
        if (user?.email) {
          const userPayload = {
            email: user.email,
            name: user.displayName || '',
            photo: user.photoURL || '',
            role: 'student',
          };
          await axios.put('http://localhost:3000/users', userPayload);
        }

        // ✅ Save enrolled class info
        if (user?.email && classInfo) {
          const enrollment = {
            email: user.email,
            title: classInfo.title,
            name: classInfo.name,
            image: classInfo.image,
            classId: classInfo._id,
            enrolledAt: new Date(),
          };
          await axios.post('http://localhost:3000/enrolled', enrollment);
        }

        // Redirect after short delay
        setTimeout(() => {
          navigate('/dashboard/my-enroll-classes');
        }, 2000);
      } else {
        setErrorMsg('❌ Payment failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('❌ Something went wrong. Try again later.');
    }

    setProcessing(false);
  };

  return (
    <div className='py-32'>
      <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Payment</h2>

        {classInfo && (
          <div className="mb-6 bg-gray-100 p-4 rounded-md border text-sm text-gray-700">
            <p><strong>Title:</strong> {classInfo.title}</p>
            <p><strong>Instructor:</strong> {classInfo.name}</p>
            <p><strong>Price:</strong> €{classInfo.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': { color: '#a0aec0' },
                  },
                  invalid: { color: '#fa755a' },
                },
              }}
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-[#cb3f02] hover:bg-[#b03601] text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {processing ? 'Processing...' : `Pay €${classInfo?.price || ''}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
 */



import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [classInfo, setClassInfo] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Fetch class data
  useEffect(() => {
    axios.get(`http://localhost:3000/classes/${id}`)
      .then(res => setClassInfo(res.data))
      .catch(err => console.error('Failed to fetch class:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !classInfo) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    try {
      // Step 1: Create payment method
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        Swal.fire('Error', error.message, 'error');
        setProcessing(false);
        return;
      }

      // Step 2: Create mock payment on backend
      const response = await axios.post('http://localhost:3000/create-payment', {
        amount: classInfo.price,
        classId: id,
      });

      if (!response.data.success) {
        Swal.fire('Payment Failed', 'Payment process failed. Try again.', 'error');
        setProcessing(false);
        return;
      }

      // Step 3: Increase enrolled count
      await axios.patch(`http://localhost:3000/classes/${id}/enroll`);

      // Step 4: Create or update user role
      if (user?.email) {
        const userPayload = {
          email: user.email,
          name: user.displayName || '',
          photo: user.photoURL || '',
          role: 'student',
        };
        await axios.put('http://localhost:3000/users', userPayload);
      }

      // Step 5: Save enrollment
      const enrollment = {
        email: user.email,
        title: classInfo.title,
        name: classInfo.name,
        image: classInfo.image,
        classId: classInfo._id,
        enrolledAt: new Date(),
      };

      const enrollRes = await axios.post('http://localhost:3000/enrolled', enrollment);

      if (enrollRes.status === 200 || enrollRes.status === 201) {
        Swal.fire({
          title: 'Payment Successful!',
          text: 'You have successfully enrolled in the class.',
          icon: 'success',
          confirmButtonText: 'Go to My Enroll Classes'
        }).then(() => {
          navigate('/dashboard/my-enroll-classes');
        });
      } else {
        Swal.fire('Error', 'Payment was successful, but enrollment failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }

    setProcessing(false);
  };

  return (
    <div className='py-32'>
      <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Payment</h2>

        {classInfo && (
          <div className="mb-6 bg-gray-100 p-4 rounded-md border text-sm text-gray-700">
            <p><strong>Title:</strong> {classInfo.title}</p>
            <p><strong>Instructor:</strong> {classInfo.name}</p>
            <p><strong>Price:</strong> €{classInfo.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': { color: '#a0aec0' },
                  },
                  invalid: { color: '#fa755a' },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-[#cb3f02] hover:bg-[#b03601] text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {processing ? 'Processing...' : `Pay €${classInfo?.price || ''}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
