import DashboardShell from "../../components/DashboardShell";
import { useGetAllUsersQuery } from "../../features/users/userApi";

export default function Users() {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

  return (
    <DashboardShell
      eyebrow="ADMIN"
      title="All Users"
      description="Manage the users registered in your PiVault workspace."
    >
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">TEAM DIRECTORY</span>
            <h3>{isLoading ? "Loading users..." : `${users.length} users`}</h3>
          </div>
        </div>

        <div className="project-list">
          {users.length > 0 ? (
            users.map((user) => (
              <article className="project-row" key={user.id}>
                <span className="project-icon">♙</span>
                <div>
                  <strong>{user.username}</strong>
                  <span>{user.email}</span>
                  <small>{user.role}</small>
                </div>
                <span className="project-arrow">→</span>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <span>♙</span>
              <strong>No users available yet</strong>
              <p>New team members will appear here after they are created.</p>
            </div>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}
