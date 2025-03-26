import { useEffect, useState } from 'react';
import { getAvailableRooms, bookRoom } from '../services/rooms';
import { getMyBookings } from '../services/bookings';

function UserDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({ roomId: 0, checkInDate: '', checkOutDate: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRooms(await getAvailableRooms());
    setBookings(await getMyBookings());
  };

  const handleBookRoom = async (e) => {
    e.preventDefault();
    await bookRoom(booking);
    setBooking({ roomId: 0, checkInDate: '', checkOutDate: '' });
    fetchData();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-amber-950">User Dashboard</h1>

      {/* Book Room */}
      <section id="book-room" className="mb-8">
        <h2 className="text-2xl mb-2">Book a Room</h2>
        <form onSubmit={handleBookRoom} className="mb-4">
          <select value={booking.roomId} onChange={(e) => setBooking({ ...booking, roomId: parseInt(e.target.value) })} className="p-2 border mr-2">
            <option value={0}>Select Room</option>
            {rooms.map(room => <option key={room.id} value={room.id}>{room.roomNumber} - {room.type} (${room.price})</option>)}
          </select>
          <input type="date" value={booking.checkInDate} onChange={(e) => setBooking({ ...booking, checkInDate: e.target.value })} className="p-2 border mr-2" />
          <input type="date" value={booking.checkOutDate} onChange={(e) => setBooking({ ...booking, checkOutDate: e.target.value })} className="p-2 border mr-2" />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Book</button>
        </form>
      </section>

      {/* My Bookings */}
      <section id="my-bookings">
        <h2 className="text-2xl mb-2">My Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200"><th className="p-2">ID</th><th>Room ID</th><th>Check-In</th><th>Check-Out</th><th>Total Price</th></tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}><td className="p-2">{booking.id}</td><td>{booking.roomId}</td><td>{new Date(booking.checkInDate).toLocaleDateString()}</td><td>{new Date(booking.checkOutDate).toLocaleDateString()}</td><td>{booking.totalPrice}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserDashboard;