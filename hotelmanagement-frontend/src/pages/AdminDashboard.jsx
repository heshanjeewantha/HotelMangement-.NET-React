import { useEffect, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../services/rooms';
import { getAllBookings } from '../services/bookings';
import { getAllUsers, deleteUser } from '../services/auth';
import '../styles/adminDashboard.css'; // Importing the external CSS file

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', type: '', price: 0, isAvailable: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRooms(await getAllRooms());
    setBookings(await getAllBookings());
    setUsers(await getAllUsers());
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    await addRoom(newRoom);
    setNewRoom({ roomNumber: '', type: '', price: 0, isAvailable: true });
    fetchData();
  };

  const handleDeleteRoom = async (id) => {
    await deleteRoom(id);
    fetchData();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchData();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Manage Rooms */}
      <section id="rooms" className="mb-8">
        <h2 className="text-2xl mb-2">Manage Rooms</h2>
        <form onSubmit={handleAddRoom} className="mb-4">
          <input type="text" placeholder="Room Number" value={newRoom.roomNumber} onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })} className="p-2 border mr-2" />
          <input type="text" placeholder="Type" value={newRoom.type} onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })} className="p-2 border mr-2" />
          <input type="number" placeholder="Price" value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} className="p-2 border mr-2" />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Room</button>
        </form>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200"><th className="p-2">ID</th><th>Room Number</th><th>Type</th><th>Price</th><th>Available</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}><td className="p-2">{room.id}</td><td>{room.roomNumber}</td><td>{room.type}</td><td>{room.price}</td><td>{room.isAvailable ? 'Yes' : 'No'}</td><td><button onClick={() => handleDeleteRoom(room.id)} className="bg-red-500 text-white p-1 rounded">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* View Bookings */}
      <section id="bookings" className="mb-8">
        <h2 className="text-2xl mb-2">Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200"><th className="p-2">ID</th><th>User ID</th><th>Room ID</th><th>Check-In</th><th>Check-Out</th><th>Total Price</th></tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}><td className="p-2">{booking.id}</td><td>{booking.userId}</td><td>{booking.roomId}</td><td>{new Date(booking.checkInDate).toLocaleDateString()}</td><td>{new Date(booking.checkOutDate).toLocaleDateString()}</td><td>{booking.totalPrice}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Manage Users */}
      <section id="users">
        <h2 className="text-2xl mb-2">Manage Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200"><th className="p-2">ID</th><th>Email</th><th>Full Name</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}><td className="p-2">{user.id}</td><td>{user.email}</td><td>{user.fullName}</td><td>{user.role}</td><td><button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-1 rounded">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
