import Header from "../_components/Header";
import RequireAuth from "../_components/RequireAuth";
import Sidebar from "../_components/Sidebar";

export default function Agendamentos() {
  return (
    <RequireAuth>
      <main className="flex min-h-screen flex-col items-center justify-between">
      <Header/>
      <Sidebar />
      Agendamentos
      </main>
    </RequireAuth>
  );
  }