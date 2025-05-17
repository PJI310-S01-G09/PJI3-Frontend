import Header from "../_components/Header";
import RequireAuth from "../_components/RequireAuth";
import Sidebar from "../_components/Sidebar";
import { ScheduleList } from "./components/ScheduleList";

export default function Agendamentos() {
  return (
    <RequireAuth>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 bg-gray-100 p-6 ml-64 mt-4"> {/* <- Compensa largura da sidebar */}
            <ScheduleList />
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}

