import CreateEvent from "./CreateEvent";
export default function Dashboard({ userId }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <CreateEvent userId={userId}></CreateEvent>
    </div>
  );
}
