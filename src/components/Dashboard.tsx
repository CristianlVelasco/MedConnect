import { Calendar, Video, FileText, Clock, User, LogOut } from 'lucide-react';

interface Appointment {
  id: number;
  doctor: string;
  doctorId: string;
  specialty: string;
  specialtyId: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

interface DashboardProps {
  userName: string;
  onNavigate: (screen: 'booking' | 'videocall' | 'history' | 'help') => void;
  onLogout: () => void;
  appointments: Appointment[];
  onReschedule: (appointment: Appointment) => void;
}

export function Dashboard({ userName, onNavigate, onLogout, appointments, onReschedule }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-900">MedConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-gray-700 hidden sm:inline">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Hola, {userName}
          </h1>
          <p className="text-gray-600">
            ¿Qué necesitas hacer hoy?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => onNavigate('booking')}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">
              Agendar nueva cita
            </h3>
            <p className="text-gray-600 text-sm">
              Reserva una consulta con un doctor
            </p>
          </button>

          <button
            onClick={() => onNavigate('videocall')}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">
              Iniciar videollamada
            </h3>
            <p className="text-gray-600 text-sm">
              Únete a tu consulta programada
            </p>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">
              Ver mi historial
            </h3>
            <p className="text-gray-600 text-sm">
              Consulta tus citas y recetas anteriores
            </p>
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">
              Tus próximas citas
            </h2>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">
                        {appointment.doctor}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {appointment.specialty}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Confirmada
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={() => onNavigate('videocall')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Unirse a la llamada
                    </button>
                    <button 
                      onClick={() => onReschedule(appointment)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Reagendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No tienes citas programadas
              </p>
              <button
                onClick={() => onNavigate('booking')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agendar mi primera cita
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-900 mb-2">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-blue-800 mb-4">
            Si tienes dudas sobre cómo usar la plataforma, estamos aquí para ayudarte.
          </p>
          <button 
            onClick={() => onNavigate('help')}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Ver guía de ayuda
          </button>
        </div>
      </main>
    </div>
  );
}