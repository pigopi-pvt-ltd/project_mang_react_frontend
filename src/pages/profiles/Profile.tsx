import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import type { RootState } from "../../app/store";
import { useGetUserQuery } from "../../features/users/userApi";

export default function Profile() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { id: idParam } = useParams();
  const userId = Number(idParam);
  const shouldFetchUser = Number.isInteger(userId) && userId > 0;
  const {
    data: fetchedUser,
    isLoading,
    isError,
  } = useGetUserQuery(userId, { skip: !shouldFetchUser });

  const name = fetchedUser?.username ?? authUser?.name ?? "PiVault user";
  const email = fetchedUser?.email ?? authUser?.email ?? "No email available";

  return (
    <DashboardShell
      eyebrow="ACCOUNT"
      title="Profile"
      description="Review the account details connected to your PiVault access."
    >
      <section className="profile-card">
        {isLoading ? (
          <p>Loading profile...</p>
        ) : isError || (idParam && !shouldFetchUser) ? (
          <p role="alert">Unable to load this user profile.</p>
        ) : (
          <>
        <div className="profile-card-top">
          <span className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </span>
          <div>
            <span className="panel-kicker">ACCOUNT PROFILE</span>
            <h3>{name}</h3>
            <p>{email}</p>
          </div>
        </div>
        <div className="profile-details">
         <div>
            <span>EMP-ID</span>
            <strong>{fetchedUser?.id ?? authUser?.id}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{fetchedUser?.role ?? authUser?.role ?? "Member"}</strong>
          </div>
          <div>
            <span>Official email</span>
            <strong>{fetchedUser?.officialEmail ?? authUser?.officialEmail ?? "Not provided"}</strong>
          </div>
          <div>
            <span>Mobile number</span>
            <strong>{fetchedUser?.mobileNumber ?? authUser?.mobileNumber ?? "Not provided"}</strong>
          </div>
          <div>
            <span>Github</span>
            <strong>{fetchedUser?.github ?? authUser?.github ?? "Not provided"}</strong>
          </div>
          <div>
            <span>Address</span>
            <strong>{fetchedUser?.address ?? authUser?.address ?? "Not provided"}</strong>
          </div>
        </div>
          </>
        )}
      </section>
    </DashboardShell>
  );
}