import React, { useEffect, useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyClass = () => {
  const { user } = useAuthContext();
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/classes?email=${user.email}`)
        .then((res) => {
          setMyClasses(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/classes/${id}`);
        setMyClasses(myClasses.filter((item) => item._id !== id));
        Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete class.', 'error');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedClass = {
      title: form.title.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
    };

    try {
      await axios.patch(`http://localhost:3000/classes/${selectedClass._id}`, updatedClass);
      setMyClasses((prev) =>
        prev.map((item) =>
          item._id === selectedClass._id ? { ...item, ...updatedClass } : item
        )
      );
      setSelectedClass(null);
      Swal.fire('Updated!', 'Class has been updated successfully.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update class.', 'error');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Classes</h2>

      {myClasses.length === 0 ? (
        <p className="text-center">No classes added yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {myClasses.map((classItem) => (
            <div key={classItem._id} className="bg-white shadow-md rounded-xl overflow-hidden border">
              <img src={classItem.image} alt={classItem.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{classItem.title}</h3>
                <p><strong>Name:</strong> {classItem.name}</p>
                <p><strong>Email:</strong> {classItem.email}</p>
                <p><strong>Price:</strong> ${classItem.price}</p>
                <p><strong>Description:</strong> {classItem.description}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`font-medium ${
                    classItem.status === 'approved'
                      ? 'text-green-600'
                      : classItem.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                  }`}>
                    {classItem.status}
                  </span>
                </p>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedClass(classItem)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => Swal.fire({
                      title: classItem.title,
                      text: classItem.description,
                      imageUrl: classItem.image,
                      imageWidth: 400,
                      imageHeight: 200,
                      imageAlt: 'Class Image'
                    })}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedClass && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Class</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input type="text" name="title" defaultValue={selectedClass.title} placeholder="Title" className="input input-bordered w-full" required />
              <input type="text" name="image" defaultValue={selectedClass.image} placeholder="Image URL" className="input input-bordered w-full" required />
              <input type="number" name="price" defaultValue={selectedClass.price} placeholder="Price" className="input input-bordered w-full" required />
              <textarea name="description" defaultValue={selectedClass.description} placeholder="Description" className="textarea textarea-bordered w-full" required></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" onClick={() => setSelectedClass(null)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyClass;
