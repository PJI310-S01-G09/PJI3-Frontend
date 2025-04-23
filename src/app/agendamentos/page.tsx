import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export default function Agendamentos() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     <Header/>
     <Sidebar />
     Agendamentos
    </main>
  );
  }