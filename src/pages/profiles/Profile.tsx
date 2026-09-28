import { useSelector } from "react-redux";
import DashboardShell from "../../components/DashboardShell";
import type { RootState } from "../../app/store";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <DashboardShell
      eyebrow="ACCOUNT"
      title="Profile"
      description="Review the account details connected to your PiVault access."
    >
      <section className="profile-card">
        <div className="profile-card-top">
          <span className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </span>
          <div>
            <span className="panel-kicker">ACCOUNT PROFILE</span>
            <h3>{user?.name ?? "PiVault user"}</h3>
            <p>{user?.email ?? "No email available"}</p>
          </div>
        </div>
        <div className="profile-details">
         <div>
            <span>EMP-ID</span>
            <strong>{user?.id}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{user?.role ?? "Member"}</strong>
          </div>
          <div>
            <span>Official email</span>
            <strong>{user?.officialEmail || "Not provided"}</strong>
          </div>
          <div>
            <span>Mobile number</span>
            <strong>{user?.mobileNumber || "Not provided"}</strong>
          </div>
          <div>
            <span>Github</span>
            <strong>{user?.github || "Not provided"}</strong>
          </div>
          <div>
            <span>Address</span>
            <strong>{user?.address || "Not provided"}</strong>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}