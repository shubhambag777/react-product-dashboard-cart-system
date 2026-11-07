
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile() {
  const email = localStorage.getItem("userEmail");

  return (
    <div>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="profile-content">
          <h2>My Profile</h2>

          <div className="profile-card">
            <div className="profile-avatar">
              {email ? email[0].toUpperCase() : "U"}
            </div>

            <h3>{email}</h3>
            <p>Logged-in User</p>

            <div className="profile-info">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Account:</strong> Active</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
